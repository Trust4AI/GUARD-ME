import OpenAI from 'openai'
import config from '../config/config'

const openaiAPIKey: string = config.openaiAPIKey

const openai: OpenAI = new OpenAI({
    apiKey: openaiAPIKey,
})

class OpenAIGPTJudgeModelService {
    async fetchModelJudgment(
        systemPrompt: string,
        userPrompt: string,
        judgeModel: string,
        judgeTemperature: number
    ): Promise<string> {
        if (!openaiAPIKey) {
            throw new Error('[GUARD-ME] OPENAI_API_KEY is not defined')
        }

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
            model: judgeModel,
            response_format: {
                type: 'json_object',
            },
            temperature: judgeTemperature,
        })
        const content = completion.choices[0].message.content

        if (content) {
            return content
        }
        throw new Error('[GUARD-ME] No content found in OpenAI GPT response')
    }
}

export default OpenAIGPTJudgeModelService
