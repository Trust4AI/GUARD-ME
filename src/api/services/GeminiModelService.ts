import config from '../config/config'
import { ProxyAgent } from 'undici'
import { GeminiGenerationConfig } from '../types'

const geminiAPIKey: string = config.geminiAPIKey
const proxyURL: string = config.proxyURL

class GeminiModelService {
    async sendRequest(
        systemPrompt: string,
        userPrompt: string,
        model: string,
        temperature: number
    ): Promise<string> {
        if (!geminiAPIKey) {
            throw new Error('[GUARD-ME] GEMINI_API_KEY is not defined')
        }

        const url: string = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiAPIKey}`

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
            generationConfig: this.getGenerationConfig(
                'text/plain',
                temperature
            ),
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

        if (content.error) {
            throw new Error(`[GUARD-ME] ${content.error.message}`)
        }
        const response = content.candidates[0].content.parts[0].text

        if (response) {
            return response
        }
        throw new Error('[GUARD-ME] No content found in Gemini response')
    }

    private getGenerationConfig(
        format: string,
        temperature: number
    ): GeminiGenerationConfig {
        const config: GeminiGenerationConfig = {
            // topP: 0.95,
            // topK: 40,
            // maxOutputTokens: 8192,
            response_mime_type: format,
        }

        if (temperature !== -1) {
            config['temperature'] = temperature
        }

        return config
    }
}

export default GeminiModelService
