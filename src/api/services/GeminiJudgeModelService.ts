import {
    ChatSession,
    GenerativeModel,
    GoogleGenerativeAI,
} from '@google/generative-ai'
import config from '../config/config'
import { GeminiGenerationConfig } from '../types'

const geminiAPIKey: string = config.geminiAPIKey

const genAI: GoogleGenerativeAI = new GoogleGenerativeAI(geminiAPIKey)

class GeminiJudgeModelService {
    async fetchModelComparison(
        systemPrompt: string,
        userPrompt: string,
        judgeModel: string
    ): Promise<string> {
        if (!geminiAPIKey) {
            throw new Error('[GUARD-ME] GEMINI_API_KEY is not defined')
        }

        const model: GenerativeModel = genAI.getGenerativeModel({
            model: judgeModel,
        })

        const generationConfig: GeminiGenerationConfig = {
            temperature: 0.5,
            topP: 0.95,
            topK: 64,
            maxOutputTokens: 8192,
            response_mime_type: 'text/plain',
        }

        const chatSession: ChatSession = model.startChat({
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

export default GeminiJudgeModelService
