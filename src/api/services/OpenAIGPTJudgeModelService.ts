import OpenAI from 'openai'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

class OpenAIGPTJudgeModelService {
    async fetchModelComparison(
        systemPrompt: string,
        userPrompt: string,
        jsonFormat = false,
        evaluatorModel: string
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
            model: evaluatorModel,
            response_format: {
                type: jsonFormat ? 'json_object' : 'text',
            },
        })
        const content = completion.choices[0].message.content ?? ''
        return content
    }
}

export default OpenAIGPTJudgeModelService
