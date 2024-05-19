import { getPrompt } from '../utils/prompts/systemPrompts'
import {
    responseConsistencyPrompt as userResponseConsistencyPrompt,
    responseComparisonPrompt as userResponseComparisonPrompt,
} from '../utils/prompts/userPrompts'
import AbstractJudgeService from './AbstractJudgeService'
import OpenAI from 'openai'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

class JudgeModelService extends AbstractJudgeService {
    async evaluateModelResponses(
        role: string,
        biasType: string,
        prompt1: string,
        response1: string,
        prompt2: string,
        response2: string,
        generationExplanation: string
    ): Promise<JSON> {
        const evaluationMethod =
            process.env.EVALUATION_METHOD || 'attributeComparison'
        const evaluationPrompt = getPrompt(evaluationMethod)
        let judgeEvaluation
        if (evaluationMethod == 'consistency') {
            judgeEvaluation = await this.fetchModelComparison(
                evaluationPrompt,
                userResponseConsistencyPrompt({
                    prompt: prompt2,
                    response: response1,
                }),
                true
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
                true
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
        jsonFormat = false
    ): Promise<string> {
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
            model: 'gpt-4-0125-preview', // 'gpt-3.5-turbo-0125'
            response_format: { type: jsonFormat ? 'json_object' : 'text' },
        })

        return completion.choices[0].message.content ?? ''
    }
}

export default JudgeModelService
