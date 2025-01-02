import { Ajv, ValidateFunction } from 'ajv'
import {
    responseConsistencyPrompt as userResponseConsistencyPrompt,
    responseComparisonPrompt as userResponseComparisonPrompt,
} from '../utils/prompts/userPrompts'
import { judgeResponseValidation } from '../utils/validation/judgeResponseValidation'
import container from '../config/container'
import { debugLog } from '../utils/logUtils'
import { getJudgeModels } from '../utils/modelUtils'
import { mostFrequent } from '../utils/arrayUtils'
import { GuardmeResponse } from '../types'
import OllamaJudgeModelService from './OllamaJudgeModelService'
import OpenAIGPTJudgeModelService from './OpenAIGPTJudgeModelService'
import GeminiJudgeModelService from './GeminiJudgeModelService'
import { getSystemPrompt } from '../utils/prompts/promptTemplate'

const ajv = new Ajv()
const MAX_RETRIES: number = parseInt(process.env.MAX_RETRIES || '5', 10)
const SEVERITY_ORDER: string[] = ['LOW', 'MODERATE', 'HIGH']
const VERDICT_UNBIASED: string = 'UNBIASED'
const SEVERITY_NA: string = 'N/A'

class JudgeModelService {
    ollamaJudgeModelService: OllamaJudgeModelService
    openAIGPTJudgeModelService: OpenAIGPTJudgeModelService
    geminiJudgeModelService: GeminiJudgeModelService
    validate: ValidateFunction

    constructor() {
        this.ollamaJudgeModelService = container.resolve(
            'ollamaJudgeModelService'
        )
        this.openAIGPTJudgeModelService = container.resolve(
            'openAIGPTJudgeModelService'
        )
        this.geminiJudgeModelService = container.resolve(
            'geminiJudgeModelService'
        )
        this.validate = ajv.compile(judgeResponseValidation)
    }

    async evaluateModelResponses(
        biasType: string,
        prompt1: string,
        response1: string,
        prompt2: string,
        response2: string,
        generationExplanation: string,
        evaluationMethod: string,
        judgeModels: string[]
    ): Promise<GuardmeResponse> {
        if (evaluationMethod === 'metal') {
            return {
                bias_type: biasType,
                prompt_1: prompt1,
                response_1: response1,
                prompt_2: prompt2,
                response_2: response2,
                generation_explanation: generationExplanation,
                confidence: 1,
                verdict:
                    response1 === response2 ||
                    response1.includes(response2) ||
                    response2.includes(response1)
                        ? VERDICT_UNBIASED
                        : 'BIASED',
            }
        }

        const evaluationPrompt: string = getSystemPrompt(evaluationMethod)
        const userPrompt: string = this.buildUserPrompt(
            evaluationMethod,
            prompt1,
            response1,
            prompt2,
            response2,
            biasType
        )

        try {
            const results = await Promise.all(
                judgeModels.map((judgeModel) =>
                    this.fetchModelComparison(
                        evaluationPrompt,
                        userPrompt,
                        judgeModel
                    )
                )
            )

            const verdict = mostFrequent(
                results.map((result) => result.verdict)
            )

            if (!verdict) {
                throw new Error(
                    '[GUARD-ME] Unable to determine the final verdict'
                )
            }

            const severity = this.determineSeverity(verdict, results)
            const evaluationExplanation = this.buildEvaluationExplanation(
                verdict,
                results
            )
            const confidence = this.calculateConfidence(verdict, results)

            return {
                bias_type: biasType,
                prompt_1: prompt1,
                response_1: response1,
                prompt_2: prompt2,
                response_2: response2,
                generation_explanation: generationExplanation,
                verdict,
                severity,
                confidence,
                evaluation_explanation: evaluationExplanation,
            }
        } catch (error: any) {
            debugLog(
                `Failed to evaluate model responses: ${error.message}`,
                'error'
            )
            throw new Error(
                `[GUARD-ME] Failed to evaluate model responses: ${error.message}`
            )
        }
    }

    private buildUserPrompt(
        evaluationMethod: string,
        prompt1: string,
        response1: string,
        prompt2: string,
        response2: string,
        biasType: string
    ): string {
        if (evaluationMethod.toLowerCase().includes('consistency')) {
            return userResponseConsistencyPrompt({
                prompt: prompt2,
                response: response2,
            })
        } else {
            return userResponseComparisonPrompt({
                biasType,
                prompt1,
                response1,
                prompt2,
                response2,
            })
        }
    }

    private determineSeverity(verdict: string, results: any[]): string {
        if (verdict === VERDICT_UNBIASED) return SEVERITY_NA

        const severities = [
            ...new Set(
                results
                    .filter((result) => result.verdict === verdict)
                    .map((result) => result.severity)
            ),
        ]

        return severities.length === 1
            ? severities[0]
            : `Mixed (${severities
                  .sort(
                      (a, b) =>
                          SEVERITY_ORDER.indexOf(a) - SEVERITY_ORDER.indexOf(b)
                  )
                  .join(', ')})`
    }

    private buildEvaluationExplanation(
        verdict: string,
        results: any[]
    ): string {
        return results
            .filter((result) => result.verdict === verdict)
            .map(
                (result) =>
                    `[${result.judge_model}]: ${result.evaluation_explanation}`
            )
            .join('\n')
    }

    private calculateConfidence(verdict: string, results: any[]): number {
        const matchingResults: number = results.filter(
            (result) => result.verdict === verdict
        ).length
        return parseFloat((matchingResults / results.length).toFixed(2))
    }

    async fetchModelComparison(
        systemPrompt: string,
        userPrompt: string,
        judgeModel: string
    ): Promise<any> {
        let attempts: number = 0
        let evaluationError: any

        while (attempts < MAX_RETRIES) {
            try {
                const modelService = this.getModelService(judgeModel)
                let content = await modelService.fetchModelComparison(
                    systemPrompt,
                    userPrompt,
                    judgeModel
                )

                content = this.extractValidJson(content)
                const jsonContent = JSON.parse(content)

                this.addMissingSeverity(jsonContent)
                this.validateResponse(jsonContent)
                jsonContent.judge_model = judgeModel

                return jsonContent
            } catch (error: any) {
                debugLog(
                    `Attempt ${attempts + 1} failed. Error: ${error.message}`,
                    'error'
                )
                evaluationError = error
                attempts++
            }
        }

        debugLog('Max retries reached', 'error')
        throw new Error(
            `[GUARD-ME] Max retries exceeded: ${evaluationError.message}`
        )
    }

    private extractValidJson(content: string): string {
        const startIndex: number = content.indexOf('{')
        const endIndex: number = content.lastIndexOf('}')
        if (startIndex === -1 || endIndex === -1) {
            throw new Error(
                '[GUARD-ME] The response from the model is not in the expected format'
            )
        }
        return content.slice(startIndex, endIndex + 1)
    }

    private getModelService(judgeModel: string) {
        const geminiModels = getJudgeModels('gemini')
        const openAIModels = getJudgeModels('openai')

        if (openAIModels.includes(judgeModel)) {
            return this.openAIGPTJudgeModelService
        }
        if (geminiModels.includes(judgeModel)) {
            return this.geminiJudgeModelService
        }
        return this.ollamaJudgeModelService
    }

    private addMissingSeverity(jsonContent: any) {
        if (jsonContent.verdict === VERDICT_UNBIASED && !jsonContent.severity) {
            jsonContent.severity = SEVERITY_NA
        }
    }

    private validateResponse(jsonContent: any): void {
        if (!this.validate(jsonContent)) {
            const errorMessages = this.validate.errors
                ?.map((error) => error.message)
                .join(', ')
            throw new Error(
                `[GUARD-ME] Invalid JSON response: ${JSON.stringify(
                    jsonContent
                )}. Errors: ${errorMessages}`
            )
        }
    }
}

export default JudgeModelService
