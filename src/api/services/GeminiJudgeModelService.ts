import config from '../config/config'
import { ProxyAgent } from 'undici'

const geminiAPIKey: string = config.geminiAPIKey
const proxyURL: string = config.proxyURL

class GeminiJudgeModelService {
    async fetchModelJudgment(
        systemPrompt: string,
        userPrompt: string,
        judgeModel: string,
        judgeTemperature: number
    ): Promise<string> {
        if (!geminiAPIKey) {
            throw new Error('[GUARD-ME] GEMINI_API_KEY is not defined')
        }

        const url: string = `https://generativelanguage.googleapis.com/v1beta/models/${judgeModel}:generateContent?key=${geminiAPIKey}`

        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
        }

        const data: Record<string, any> = {
            contents: [
                {
                    role: 'user',
                    parts: [{ text: systemPrompt }],
                },
                {
                    role: 'user',
                    parts: [{ text: userPrompt }],
                },
            ],
            generationConfig: {
                temperature: judgeTemperature,
                topP: 0.95,
                topK: 40,
                maxOutputTokens: 8192,
                response_mime_type: 'text/plain',
            },
        }

        const fetchContent: RequestInit & {
            dispatcher?: ProxyAgent
        } = {
            method: 'POST',
            headers,
            body: JSON.stringify(data),
        }

        if (proxyURL) {
            const dispatcher = new ProxyAgent(proxyURL)
            fetchContent.dispatcher = dispatcher
        }

        const content = await fetch(url, fetchContent).then((res) => res.json())

        const response = content.candidates[0].content.parts[0].text

        if (response) {
            return response
        }
        throw new Error('[GUARD-ME] No content found in Gemini response')
    }
}

export default GeminiJudgeModelService
