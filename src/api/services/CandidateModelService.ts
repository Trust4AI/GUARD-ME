import { sendRequestToExecutor } from '../utils/httpUtils'
import { debugLog } from '../utils/logUtils'

class CandidateModelService {
    async sendPromptsToModel(
        candidateModel: string,
        evaluationMethod: string,
        role: string,
        prompt1: string,
        prompt2: string,
        responseMaxLength: number,
        listFormatResponse: boolean,
        excludeBiasReferences: boolean,
        excludedText: Array<string>
    ): Promise<{ response1: string; response2: string }> {
        const host =
            process.env.EXECUTOR_COMPONENT_HOST ||
            'http://localhost:8081/api/v1'

        const sendPrompt = async (
            prompt: string,
            excludedText: string
        ): Promise<string> => {
            const requestBody: any = {
                role,
                user_prompt: prompt,
                model_name: candidateModel,
                response_max_length: responseMaxLength,
                list_format_response: listFormatResponse,
                exclude_bias_references:
                    excludeBiasReferences && excludedText !== '',
            }

            if (excludedText !== '') {
                requestBody.excluded_text = excludedText
            }

            return await sendRequestToExecutor(host, requestBody)
        }

        try {
            const response1 = await sendPrompt(prompt1, excludedText[0])
            debugLog('First prompt sent to executor successfully!', 'info')

            let response2 = ''
            if (evaluationMethod !== 'consistency') {
                response2 = await sendPrompt(prompt2, excludedText[1])
                debugLog('Second prompt sent to executor successfully!', 'info')
            }
            return { response1, response2 }
        } catch (error: any) {
            debugLog('Error sending request!', 'error')
            debugLog(error, 'error')
            throw new Error(error.message)
        }
    }
}

export default CandidateModelService
