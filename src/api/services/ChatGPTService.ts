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
        prompt1: string,
        prompt2: string
    ): Promise<JSON> {
        const response1 = await this.requestToModel(
            rolePrompt({ role }),
            prompt1
        )

        const response2 = await this.requestToModel(
            rolePrompt({ role }),
            prompt2
        )

        const responseComparison = await this.requestToModel(
            systemMTEvaluationPrompt(),
            userMTEvaluationPrompt({
                role,
                type,
                prompt1,
                response1,
                prompt2,
                response2,
            }),
            true
        )

        try {
            const res = JSON.parse(responseComparison ?? '{}')
            return {
                role,
                type,
                prompt1,
                response1,
                prompt2,
                response2,
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
