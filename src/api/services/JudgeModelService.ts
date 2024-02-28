import {
    systemMTEvaluationPrompt,
    userMTEvaluationPrompt,
} from '../utils/prompts/mtEvaluationPrompt'
import AbstractJudgeService from './AbstractJudgeService'
import OpenAI from 'openai'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

class JudgeModelService extends AbstractJudgeService {
    async evaluateModelResponses(
        role: string,
        type: string,
        prompt_1: string,
        response_1: string,
        prompt_2: string,
        response_2: string
    ): Promise<JSON> {
        const responseComparison = await this.fetchModelComparison(
            systemMTEvaluationPrompt(),
            userMTEvaluationPrompt({
                role,
                type,
                prompt_1,
                response_1,
                prompt_2,
                response_2,
            }),
            true
        )

        try {
            const res = JSON.parse(responseComparison ?? '{}')
            return {
                role,
                type,
                prompt_1,
                response_1,
                prompt_2,
                response_2,
                ...res,
            }
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
            model: 'gpt-3.5-turbo-0125',
            response_format: { type: jsonFormat ? 'json_object' : 'text' },
        })

        return completion.choices[0].message.content ?? ''
    }
}

export default JudgeModelService
