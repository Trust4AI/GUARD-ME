import { getCandidateModelConfig } from '../config/models'
import generateRoleBasedPrompt from '../utils/prompts/systemRolePrompt'
import AbstractCandidateService from './AbstractCandidateService'
import { Ollama } from 'ollama'

class CandidateModelService extends AbstractCandidateService {
    candidateModel: string
    model: string
    host: string
    ollama: any

    constructor() {
        super()
        this.candidateModel = process.env.CANDIDATE_MODEL || 'gemma'
        const modelData = getCandidateModelConfig(this.candidateModel)

        this.model = modelData?.name ?? 'gemma:2b'
        this.host = modelData?.host ?? 'http://localhost:11434'
        this.ollama = new Ollama({ host: this.host })
    }

    async sendPromptsToModel(
        role: string,
        prompt_1: string,
        prompt_2: string
    ): Promise<{ response_1: string; response_2: string }> {
        const response_1: string = await this.sendPromptToModel(
            generateRoleBasedPrompt({ role }),
            prompt_1
        )

        const response_2: string = await this.sendPromptToModel(
            generateRoleBasedPrompt({ role }),
            prompt_2
        )

        return {
            response_1,
            response_2,
        }
    }

    async sendPromptToModel(
        systemPrompt: string,
        userPrompt: string
    ): Promise<string> {
        const response = await this.ollama.chat({
            model: this.model,
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
        })
        return response.message.content
    }
}

export default CandidateModelService
