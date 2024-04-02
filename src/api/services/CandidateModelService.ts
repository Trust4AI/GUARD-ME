import { CustomModelResponse } from '../interfaces/CustomModelResponse'
import { delay } from '../utils/time'
import AbstractCandidateService from './AbstractCandidateService'

const RESPONSE_MAX_LENGTH = 150

class CandidateModelService extends AbstractCandidateService {
    async sendPromptsToModel(
        role: string,
        prompt_1: string,
        prompt_2: string
    ): Promise<{ response_1: string; response_2: string }> {
        const modelName = process.env.CANDIDATE_MODEL
        const endpoint =
            process.env.EXECUTOR_COMPONENT_HOST + '/v1/models/execute'

        const response_1: string = await this.httpClient
            .post(endpoint, {
                role: role,
                prompt: prompt_1,
                model_name: modelName,
                max_length: RESPONSE_MAX_LENGTH,
            })
            .then((res: CustomModelResponse) => res.response)

        await delay(1000)

        const response_2: string = await this.httpClient
            .post(endpoint, {
                role: role,
                prompt: prompt_2,
                model_name: modelName,
                max_length: RESPONSE_MAX_LENGTH,
            })
            .then((res: CustomModelResponse) => res.response)

        return {
            response_1,
            response_2,
        }
    }
}

export default CandidateModelService
