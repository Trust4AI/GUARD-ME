import container from '../config/container'
import { EvaluationResponse } from '../types'
//import { writeOutputToFile } from '../utils/fileUtils'

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
        judgeModels: string[],
        evaluationMethod: string,
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
        excludeBiasReferences: boolean,
        temperature: number
    ) {
        const startTimestamp: number = Date.now()

        let excludedText: string[]

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

        if (!responseAux1 && !responseAux2) {
            const result: any =
                await this.candidateModelService.sendPromptsToModel(
                    candidateModel,
                    evaluationMethod,
                    prompt1,
                    prompt2,
                    responseMaxLength,
                    listFormatResponse,
                    excludeBiasReferences,
                    excludedText,
                    temperature
                )

            prompt1 = result.prompt1
            prompt2 = result.prompt2
            responseAux1 = result.response1
            responseAux2 = result.response2
        }

        const response: EvaluationResponse =
            await this.judgeModelService.evaluateModelResponses(
                biasType,
                prompt1,
                responseAux1,
                prompt2,
                responseAux2,
                generationExplanation,
                evaluationMethod,
                judgeModels
            )

        if (attribute) {
            response.attribute = attribute
        } else {
            response.attribute_1 = attribute1
            response.attribute_2 = attribute2
        }

        const stopTimestamp: number = Date.now()

        response.start_timestamp = startTimestamp
        response.stop_timestamp = stopTimestamp

        //writeOutputToFile(response)
        return response
    }
}

export default EvaluatorBaseService
