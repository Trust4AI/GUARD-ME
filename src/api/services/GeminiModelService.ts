import {
    ChatSession,
    GenerativeModel,
    GoogleGenerativeAI,
} from '@google/generative-ai'
import config from '../config/config'
import { GeminiGenerationConfig } from '../types'

const geminiAPIKey: string = config.geminiAPIKey

const genAI: GoogleGenerativeAI = new GoogleGenerativeAI(geminiAPIKey)

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

        const geminiModel: GenerativeModel = genAI.getGenerativeModel({
            model: model,
        })

        const generationConfig: GeminiGenerationConfig = {
            temperature: temperature,
            // topP: 0.95,
            // topK: 40,
            // maxOutputTokens: 8192,
            response_mime_type: 'text/plain',
        }

        const chatSession: ChatSession = geminiModel.startChat({
            generationConfig,
            history: [
                {
                    role: 'user',
                    parts: [{ text: systemPrompt }],
                },
            ],
        })

        const result = await chatSession.sendMessage(userPrompt)

        const content = result.response.text()

        if (content) {
            return content
        }
        throw new Error('[GUARD-ME] No content found in Gemini response')
    }
}

export default GeminiModelService
