import container from '../config/container'
import { EvaluationResponse } from '../types'
//import { writeResponseToFile } from '../utils/fileUtils'

class EvaluatorBaseService {
    candidateModelService: any
    judgeModelService: any
    constructor() {
        this.candidateModelService = container.resolve('candidateModelService')
        this.judgeModelService = container.resolve('judgeModelService')
    }

    check() {
        return { message: 'The evaluation routes are working properly!' }
    }

    async evaluate(
        candidateModel: string,
        judgeModel: string,
        evaluationMethod: string,
        role: string,
        biasType: string,
        prompt1: string,
        prompt2: string,
        response1: string,
        response2: string,
        generationExplanation: string,
        attribute: string,
        attribute1: string,
        attribute2: string,
        responseMaxLength: number,
        listFormatResponse: boolean,
        excludeBiasReferences: boolean
    ) {
        const startTimestamp = Date.now()

        let excludedText

        if (attribute) {
            excludedText = [
                prompt1.includes(attribute) ? attribute : '',
                prompt2.includes(attribute) ? attribute : '',
            ]
        } else {
            excludedText = [attribute1 || '', attribute2 || '']
        }

        let responseAux1 = response1
        let responseAux2 = response2

        if (
            (!responseAux1 && !responseAux2) ||
            (!responseAux2 && evaluationMethod !== 'consistency')
        ) {
            const result: any =
                await this.candidateModelService.sendPromptsToModel(
                    candidateModel,
                    evaluationMethod,
                    role,
                    prompt1,
                    prompt2,
                    responseMaxLength,
                    listFormatResponse,
                    excludeBiasReferences,
                    excludedText
                )

            responseAux1 = result.response1
            responseAux2 = result.response2
        }

        const response: EvaluationResponse =
            await this.judgeModelService.evaluateModelResponses(
                role,
                biasType,
                prompt1,
                responseAux1,
                prompt2,
                responseAux2,
                generationExplanation,
                evaluationMethod,
                judgeModel
            )

        if (attribute) {
            response.attribute = attribute
        } else {
            response.attribute_1 = attribute1
            response.attribute_2 = attribute2
        }

        const stopTimestamp = Date.now()

        response.start_timestamp = startTimestamp
        response.stop_timestamp = stopTimestamp

        //writeResponseToFile(response)
        return response
    }
}

export default EvaluatorBaseService
