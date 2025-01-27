import OpenAI from 'openai'
import config from '../config/config'
import { HttpsProxyAgent } from 'https-proxy-agent'

const openaiAPIKey: string = config.openaiAPIKey

const proxyURL: string = config.proxyURL

const openaiConfig: { apiKey: string; httpAgent?: HttpsProxyAgent<string> } = {
    apiKey: openaiAPIKey,
}

if (proxyURL) {
    openaiConfig.httpAgent = new HttpsProxyAgent(proxyURL)
}

const openai: OpenAI = new OpenAI(openaiConfig)

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
