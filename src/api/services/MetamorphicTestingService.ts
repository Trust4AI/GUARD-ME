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
        prompt_1: string,
        prompt_2: string
    ) {
        const startTimestamp = Date.now()
        const { response_1, response_2 } =
            await this.candidateModelService.sendPromptsToModel(
                role,
                prompt_1,
                prompt_2
            )

        const response: CustomEvaluationResponse =
            await this.judgeModelService.evaluateModelResponses(
                role,
                biasType,
                prompt_1,
                response_1,
                prompt_2,
                response_2
            )
        const stopTimestamp = Date.now()

        response.startTimestamp = startTimestamp
        response.stopTimestamp = stopTimestamp

        writeResponseToFile(response)
        return response
    }
}

export default MetamorphicTestingService
