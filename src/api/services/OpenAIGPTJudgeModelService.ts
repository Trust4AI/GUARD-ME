import OpenAI from 'openai'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || '',
})

class OpenAIGPTJudgeModelService {
    async fetchModelComparison(
        systemPrompt: string,
        userPrompt: string,
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
                type: 'json_object',
            },
        })
        const content = completion.choices[0].message.content

        if (content) {
            return content
        }
        throw new Error('[EVALUATOR] No content found in OpenAI GPT response')
    }
}

export default OpenAIGPTJudgeModelService
