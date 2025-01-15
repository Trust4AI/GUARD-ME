import config from '../config/config'
import { sendRequestToGenie } from '../utils/httpUtils'
import { debugLog } from '../utils/logUtils'

class OllamaJudgeModelService {
    async fetchModelComparison(
        systemPrompt: string,
        userPrompt: string,
        judgeModel: string
    ): Promise<string> {
        const genieBaseUrl: string = config.genieBaseUrl

        const requestBody = {
            user_prompt: userPrompt,
            system_prompt: systemPrompt,
            model_name: judgeModel,
            list_format_response: false,
            exclude_bias_references: false,
            format: 'json',
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

export default OllamaJudgeModelService
