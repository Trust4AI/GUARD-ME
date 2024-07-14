import { GoogleGenerativeAI } from '@google/generative-ai'

const geminiAPIKey = process.env.GEMINI_API_KEY || ''

const genAI = new GoogleGenerativeAI(geminiAPIKey)

class GeminiJudgeModelService {
    async fetchModelComparison(
        systemPrompt: string,
        userPrompt: string,
        evaluatorModel: string
    ): Promise<string> {
        const model = genAI.getGenerativeModel({
            model: evaluatorModel,
        })

        const generationConfig = {
            temperature: 1,
            topP: 0.95,
            topK: 64,
            maxOutputTokens: 8192,
            response_mime_type: 'text/plain',
        }

        const chatSession = model.startChat({
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
        throw new Error('[EVALUATOR] No content found in Gemini response')
    }
}

export default GeminiJudgeModelService
