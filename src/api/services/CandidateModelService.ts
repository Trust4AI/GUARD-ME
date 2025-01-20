import config from '../config/config'
import { sendRequestToGenie } from '../utils/httpUtils'
import { debugLog } from '../utils/logUtils'
import { SendPromptsDTO } from '../utils/objects/SendPromptsDTO'
import { requestConsistencyPrompt } from '../utils/prompts/userPrompts'

class CandidateModelService {
    async sendPromptsToModel(dto: SendPromptsDTO): Promise<{
        prompt1: string
        prompt2: string
        response1: string
        response2: string
    }> {
        const {
            candidateModel,
            evaluationMethod,
            prompt1,
            prompt2,
            responseMaxLength,
            listFormatResponse,
            excludeBiasReferences,
            excludedText,
            candidateTemperature,
        } = dto

        const genieBaseUrl: string = config.genieBaseUrl

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
                requestBody.temperature = candidateTemperature

                if (excludeBiasReferences && excludedText) {
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

            let promptAux = prompt2

            if (
                evaluationMethod === 'consistency' ||
                evaluationMethod === 'inverted_consistency'
            ) {
                promptAux = requestConsistencyPrompt({
                    prompt: prompt2,
                    response: response1,
                })
                excludedText[1] = ''
                hasSystemPrompt = false
            }

            const response2 = await sendPrompt(
                promptAux,
                excludedText[1],
                hasSystemPrompt
            )
            debugLog('Second prompt sent to GENIE successfully!', 'info')

            return { prompt1, prompt2: promptAux, response1, response2 }
        } catch (error: any) {
            debugLog('Error sending request!', 'error')
            debugLog(error, 'error')
            throw new Error(error.message)
        }
    }
}

export default CandidateModelService
