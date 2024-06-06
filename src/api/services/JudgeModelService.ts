import { Ajv } from 'ajv'
import { getPrompt } from '../utils/prompts/systemPrompts'
import {
    responseConsistencyPrompt as userResponseConsistencyPrompt,
    responseComparisonPrompt as userResponseComparisonPrompt,
} from '../utils/prompts/userPrompts'
import { judgeResponseValidation } from '../utils/validation/judgeResponseValidation'
import AbstractJudgeService from './AbstractJudgeService'
import OpenAI from 'openai'
import { json } from 'node:stream/consumers'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

const ajv = new Ajv()

const MAX_RETRIES = parseInt(process.env.MAX_RETRIES || '5', 10)

class JudgeModelService extends AbstractJudgeService {
    async evaluateModelResponses(
        role: string,
        biasType: string,
        prompt1: string,
        response1: string,
        prompt2: string,
        response2: string,
        generationExplanation: string,
        evaluationMethod: string,
        evaluatorModel: string
    ): Promise<JSON> {
        const evaluationPrompt = getPrompt(evaluationMethod)
        let judgeEvaluation
        if (evaluationMethod == 'consistency') {
            judgeEvaluation = await this.fetchModelComparison(
                evaluationPrompt,
                userResponseConsistencyPrompt({
                    prompt: prompt2,
                    response: response1,
                }),
                true,
                evaluatorModel
            )
        } else {
            // comparison
            judgeEvaluation = await this.fetchModelComparison(
                evaluationPrompt,
                userResponseComparisonPrompt({
                    role,
                    biasType,
                    prompt1,
                    response1,
                    prompt2,
                    response2,
                }),
                true,
                evaluatorModel
            )
        }

        try {
            const res = JSON.parse(judgeEvaluation ?? '{}')
            const aux: any = {
                role: role,
                bias_type: biasType,
                prompt_1: prompt1,
                response_1: response1,
                prompt_2: prompt2,
                response_2: response2,
                generation_explanation: generationExplanation,
            }
            return { ...aux, ...res }
        } catch (err) {
            console.error(err)
            return JSON.parse('{}')
        }
    }

    async fetchModelComparison(
        systemPrompt: string,
        userPrompt: string,
        jsonFormat = false,
        evaluatorModel: string
    ): Promise<string> {
        let attempts = 0
        while (attempts < MAX_RETRIES) {
            try {
                const completion = await openai.chat.completions.create({
                    messages: [
                        {
                            role: 'system',
                            content: systemPrompt,
                        },
                        {
                            role: 'user',
                            content: userPrompt,
                        },
                    ],
                    model: evaluatorModel,
                    response_format: {
                        type: jsonFormat ? 'json_object' : 'text',
                    },
                })
                const content = completion.choices[0].message.content ?? ''
                const jsonContent = JSON.parse(content ?? '{}')

                if (
                    jsonContent.hasOwnProperty('verdict') &&
                    jsonContent.verdict === 'UNBIASED' &&
                    !jsonContent.hasOwnProperty('severity')
                ) {
                    jsonContent.severity = 'N/A'
                }

                const validate = ajv.compile(judgeResponseValidation)

                if (!validate(jsonContent)) {
                    console.error('Invalid response:', validate.errors)
                    throw new Error('Invalid response')
                }
                return content
            } catch (err) {
                console.warn(`Attempt ${attempts + 1} failed. Retrying...`, err)
            }
            attempts++
        }
        return ''
    }
}

export default JudgeModelService
