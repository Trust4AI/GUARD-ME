import OpenAI from 'openai'

const openaiAPIKey: string = process.env.OPENAI_API_KEY ?? ''

const openai: OpenAI = new OpenAI({
    apiKey: openaiAPIKey,
})

class OpenAIGPTJudgeModelService {
    async fetchModelComparison(
        systemPrompt: string,
        userPrompt: string,
        judgeModel: string
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
        })
        const content = completion.choices[0].message.content

        if (content) {
            return content
        }
        throw new Error('[GUARD-ME] No content found in OpenAI GPT response')
    }
}

export default OpenAIGPTJudgeModelService
