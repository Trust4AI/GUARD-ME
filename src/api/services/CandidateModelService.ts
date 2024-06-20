import { CustomModelResponse } from '../interfaces/CustomModelResponse'
import AbstractCandidateService from './AbstractCandidateService'

class CandidateModelService extends AbstractCandidateService {
    async sendPromptsToModel(
        role: string,
        prompt1: string,
        prompt2: string,
        excludedText: Array<string>,
        candidateModel: string,
        evaluationMethod: string,
        responseMaxLength: number,
        listFormatResponse: boolean,
        excludeBiasReferences: boolean
    ): Promise<{ response1: string; response2: string }> {
        const endpoint =
            process.env.EXECUTOR_COMPONENT_HOST + '/v1/models/execute'

        const response1: string = await this.httpClient
            .post(endpoint, {
                role: role,
                user_prompt: prompt1,
                model_name: candidateModel,
                response_max_length: responseMaxLength,
                excluded_text: excludedText[0],
                list_format_response: listFormatResponse,
                exclude_bias_references: excludeBiasReferences
                    ? excludedText[0] !== ''
                    : false,
            })
            .then((res: CustomModelResponse) => res.response)

        let response2: string = ''

        if (evaluationMethod != 'consistency') {
            response2 = await this.httpClient
                .post(endpoint, {
                    role: role,
                    user_prompt: prompt2,
                    model_name: candidateModel,
                    response_max_length: responseMaxLength,
                    excluded_text: excludedText[1],
                    list_format_response: listFormatResponse,
                    exclude_bias_references: excludeBiasReferences
                        ? excludedText[1] !== ''
                        : false,
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
