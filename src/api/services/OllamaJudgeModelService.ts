import container from '../containers/container'
import { CustomModelResponse } from '../interfaces/CustomModelResponse'

class OllamaJudgeModelService {
    async fetchModelComparison(
        systemPrompt: string,
        userPrompt: string,
        evaluatorModel: string
    ): Promise<string> {
        const endpoint =
            process.env.EXECUTOR_COMPONENT_HOST + '/v1/models/execute'
        const httpClient = container.resolve('httpClient')

        const requestBody = {
            user_prompt: userPrompt,
            system_prompt: systemPrompt,
            model_name: evaluatorModel,
            list_format_response: false,
            exclude_bias_references: false,
            response_max_length: -1,
        }

        const response: string = await httpClient
            .post(endpoint, requestBody)
            .then((res: CustomModelResponse) => res.response)
            .catch((error: any) => {
                console.error('Error posting to executor component:', error)
                return 'Error posting to executor component'
            })

        return response
    }
}

export default OllamaJudgeModelService
