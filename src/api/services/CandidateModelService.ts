import { CustomModelResponse } from '../interfaces/CustomModelResponse'
import AbstractCandidateService from './AbstractCandidateService'

const RESPONSE_MAX_LENGTH = 150

class CandidateModelService extends AbstractCandidateService {
    async sendPromptsToModel(
        role: string,
        prompt1: string,
        prompt2: string,
        excludedText: string
    ): Promise<{ response1: string; response2: string }> {
        const modelName = process.env.CANDIDATE_MODEL
        const endpoint =
            process.env.EXECUTOR_COMPONENT_HOST + '/v1/models/execute'
        const evaluationMethod =
            process.env.EVALUATION_METHOD || 'attributeComparison'

        const response1: string = await this.httpClient
            .post(endpoint, {
                role: role,
                prompt: prompt1,
                model_name: modelName,
                max_length: RESPONSE_MAX_LENGTH,
                excluded_text: excludedText,
            })
            .then((res: CustomModelResponse) => res.response)

        let response2: string = ''

        if (evaluationMethod != 'consistency') {
            response2 = await this.httpClient
                .post(endpoint, {
                    role: role,
                    prompt: prompt2,
                    model_name: modelName,
                    max_length: RESPONSE_MAX_LENGTH,
                })
                .then((res: CustomModelResponse) => res.response)
        }

        return {
            response1,
            response2,
        }
    }
}

export default CandidateModelService
