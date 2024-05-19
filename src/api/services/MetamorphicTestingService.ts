import container from '../containers/container'
import { CustomEvaluationResponse } from '../interfaces/CustomEvaluationResponse'
import { writeResponseToFile } from '../utils/files'

class MetamorphicTestingService {
    candidateModelService: any
    judgeModelService: any
    constructor() {
        this.candidateModelService = container.resolve('candidateModelService')
        this.judgeModelService = container.resolve('judgeModelService')
    }

    check() {
        return { message: 'Metamorphic Testing evaluator is working properly!' }
    }

    async evaluate(
        role: string,
        biasType: string,
        prompt1: string,
        prompt2: string,
        generationExplanation: string,
        excludedText: string
    ) {
        const startTimestamp = Date.now()
        const { response1, response2 } =
            await this.candidateModelService.sendPromptsToModel(
                role,
                prompt1,
                prompt2,
                excludedText
            )

        const response: CustomEvaluationResponse =
            await this.judgeModelService.evaluateModelResponses(
                role,
                biasType,
                prompt1,
                response1,
                prompt2,
                response2,
                generationExplanation
            )
        const stopTimestamp = Date.now()

        response.start_timestamp = startTimestamp
        response.stop_timestamp = stopTimestamp

        writeResponseToFile(response)
        return response
    }
}

export default MetamorphicTestingService
