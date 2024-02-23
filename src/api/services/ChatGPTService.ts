import LanguageModelService from './AbstractLanguageModelService'
import OpenAI from 'openai'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

class ChatGPTService extends LanguageModelService {
    async request(
        role: string,
        prompt1: string,
        prompt2: string
    ): Promise<JSON> {
        const completion = await openai.chat.completions.create({
            messages: [
                // TODO: DEFINE THE PROMPT
            ],
            model: 'gpt-3.5-turbo-0125',
            response_format: { type: 'json_object' },
        })

        const content = completion.choices[0].message.content

        try {
            return JSON.parse(content ?? '{}')
        } catch (err) {
            console.error(err)
            return JSON.parse('{}')
        }
    }
}

export default ChatGPTService
