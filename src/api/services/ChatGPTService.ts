import {
    systemMTEvaluationPrompt,
    userMTEvaluationPrompt,
} from '../utils/prompts/mtEvaluationPrompt'
import rolePrompt from '../utils/prompts/rolePrompt'
import LanguageModelService from './AbstractLanguageModelService'
import OpenAI from 'openai'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

class ChatGPTService extends LanguageModelService {
    async request(
        role: string,
        type: string,
        prompt_1: string,
        prompt_2: string
    ): Promise<JSON> {
        const response_1 = await this.requestToModel(
            rolePrompt({ role }),
            prompt_1
        )

        const response_2 = await this.requestToModel(
            rolePrompt({ role }),
            prompt_2
        )

        const responseComparison = await this.requestToModel(
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

    async requestToModel(
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

export default ChatGPTService
