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

const MODELS_WITHOUT_TEMPERATURE = ['o3-mini-2025-01-31']

class OpenAIModelService {
    async sendRequest(
        systemPrompt: string,
        userPrompt: string,
        model: string,
        temperature: number
    ): Promise<string> {
        if (!openaiAPIKey) {
            throw new Error('[GUARD-ME] OPENAI_API_KEY is not defined')
        }

        const options: any = {
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
            model: model,
            response_format: {
                type: 'json_object',
            },
        }

        if (!MODELS_WITHOUT_TEMPERATURE.includes(model)) {
            options.temperature = temperature
        }

        const completion = await openai.chat.completions.create(options)
        const content = completion.choices[0].message.content

        if (content) {
            return content
        }
        throw new Error('[GUARD-ME] No content found in OpenAI GPT response')
    }
}

export default OpenAIModelService
