import container from '../config/container'
import { CustomEvaluationResponse } from '../interfaces/CustomEvaluationResponse'
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
        evaluatorModel: string,
        evaluationMethod: string,
        role: string,
        biasType: string,
        prompt1: string,
        prompt2: string,
        response1: string,
        response2: string,
        generationExplanation: string,
        responseMaxLength: number,
        listFormatResponse: boolean,
        excludeBiasReferences: boolean,
        excludedText: Array<string>
    ) {
        const startTimestamp = Date.now()
        let responseAux1 = response1
        let responseAux2 = response2

        if (
            (!responseAux1 && !responseAux2) ||
            (!responseAux2 && evaluationMethod !== 'consistency')
        ) {
            ;({ responseAux1, responseAux2 } =
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
                ))
        }

        const response: CustomEvaluationResponse =
            await this.judgeModelService.evaluateModelResponses(
                role,
                biasType,
                prompt1,
                responseAux1,
                prompt2,
                responseAux2,
                generationExplanation,
                evaluationMethod,
                evaluatorModel
            )
        const stopTimestamp = Date.now()

        response.start_timestamp = startTimestamp
        response.stop_timestamp = stopTimestamp

        //writeResponseToFile(response)
        return response
    }
}

export default EvaluatorBaseService
