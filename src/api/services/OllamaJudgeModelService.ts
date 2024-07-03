import { sendRequestToExecutor } from '../utils/httpUtils'
import { debugLog } from '../utils/logUtils'

class OllamaJudgeModelService {
    async fetchModelComparison(
        systemPrompt: string,
        userPrompt: string,
        evaluatorModel: string
    ): Promise<string> {
        const host =
            process.env.EXECUTOR_COMPONENT_HOST ||
            'http://localhost:8081/api/v1'

        const requestBody = {
            user_prompt: userPrompt,
            system_prompt: systemPrompt,
            model_name: evaluatorModel,
            list_format_response: false,
            exclude_bias_references: false,
            response_max_length: -1,
        }

        try {
            const response: string = await sendRequestToExecutor(
                host,
                requestBody
            )
            debugLog('Request sent to executor successfully!', 'info')
            debugLog(`Response from executor: ${response}`, 'info')
            return response
        } catch (error: any) {
            debugLog('Error sending request!', 'error')
            debugLog(error, 'error')
            throw new Error(error.message)
        }
    }
}

export default OllamaJudgeModelService
