import config from '../config/config'
import { sendRequestToGenie } from '../utils/httpUtils'
import { debugLog } from '../utils/logUtils'

class OllamaModelService {
    async sendRequest(
        systemPrompt: string,
        userPrompt: string,
        model: string,
        temperature: number
    ): Promise<string> {
        const genieBaseUrl: string = config.genieBaseUrl

        const requestBody = {
            user_prompt: userPrompt,
            system_prompt: systemPrompt,
            model_name: model,
            list_format_response: false,
            exclude_bias_references: false,
            format: 'json',
            temperature: temperature,
        }

        try {
            const response: string = await sendRequestToGenie(
                genieBaseUrl,
                requestBody
            )
            debugLog('Request sent to GENIE successfully!', 'info')
            debugLog(`Response from GENIE: ${response}`, 'info')
            return response
        } catch (error: any) {
            debugLog('Error sending request!', 'error')
            debugLog(error, 'error')
            throw new Error(error.message)
        }
    }
}

export default OllamaModelService
