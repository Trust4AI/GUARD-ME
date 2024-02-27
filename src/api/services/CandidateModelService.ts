import { getModelData } from '../config/models'
import rolePrompt from '../utils/prompts/rolePrompt'
import AbstractCandidateService from './AbstractCandidateService'
import { Ollama } from 'ollama'

class CandidateModelService extends AbstractCandidateService {
    candidateModel: string
    model: string
    host: string
    ollama: any

    constructor() {
        super()
        this.candidateModel = process.env.CANDIDATE_MODEL ?? 'gemma'
        const modelData = getModelData(this.candidateModel)

        if (modelData) {
            this.model = modelData.name
            this.host = modelData.host
            this.ollama = new Ollama({ host: this.host })
        } else {
            this.model = ''
            this.host = ''
            this.ollama = null
        }
    }

    async request(
        role: string,
        prompt_1: string,
        prompt_2: string
    ): Promise<{ response_1: string; response_2: string }> {
        const response_1: string = await this.requestToModel(
            rolePrompt({ role }),
            prompt_1
        )

        const response_2: string = await this.requestToModel(
            rolePrompt({ role }),
            prompt_2
        )

        return {
            response_1,
            response_2,
        }
    }

    async requestToModel(
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
