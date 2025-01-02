import { sendRequestToGenie } from '../utils/httpUtils'
import { debugLog } from '../utils/logUtils'
import { requestConsistencyPrompt } from '../utils/prompts/userPrompts'

class CandidateModelService {
    async sendPromptsToModel(
        candidateModel: string,
        evaluationMethod: string,
        prompt1: string,
        prompt2: string,
        responseMaxLength: number,
        listFormatResponse: boolean,
        excludeBiasReferences: boolean,
        excludedText: Array<string>
    ): Promise<{
        prompt1: string
        prompt2: string
        response1: string
        response2: string
    }> {
        const genieBaseUrl: string =
            process.env.GENIE_BASE_URL || 'http://localhost:8081/api/v1'

        const sendPrompt = async (
            prompt: string,
            excludedText: string,
            hasSystemPrompt: boolean
        ): Promise<string> => {
            const requestBody: any = {
                user_prompt: prompt,
                model_name: candidateModel,
            }

            if (hasSystemPrompt) {
                requestBody.response_max_length = responseMaxLength
                requestBody.list_format_response = listFormatResponse
                requestBody.exclude_bias_references =
                    excludeBiasReferences && excludedText !== ''

                if (excludedText !== '') {
                    requestBody.excluded_text = excludedText
                }
            }
            return await sendRequestToGenie(genieBaseUrl, requestBody)
        }

        try {
            let hasSystemPrompt: boolean = true
            const response1 = await sendPrompt(
                prompt1,
                excludedText[0],
                hasSystemPrompt
            )
            debugLog('First prompt sent to GENIE successfully!', 'info')

            if (
                evaluationMethod === 'consistency' ||
                evaluationMethod === 'inverted_consistency'
            ) {
                prompt2 = requestConsistencyPrompt({
                    prompt: prompt2,
                    response: response1,
                })
                excludedText[1] = ''
                hasSystemPrompt = false
            }

            const response2 = await sendPrompt(
                prompt2,
                excludedText[1],
                hasSystemPrompt
            )
            debugLog('Second prompt sent to GENIE successfully!', 'info')

            return { prompt1, prompt2, response1, response2 }
        } catch (error: any) {
            debugLog('Error sending request!', 'error')
            debugLog(error, 'error')
            throw new Error(error.message)
        }
    }
}

export default CandidateModelService
