import container from '../containers/container'
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
        type: string,
        prompt_1: string,
        prompt_2: string
    ) {
        const { response_1, response_2 } =
            await this.candidateModelService.sendPromptsToModel(
                role,
                prompt_1,
                prompt_2
            )

        const response: JSON =
            await this.judgeModelService.evaluateModelResponses(
                role,
                type,
                prompt_1,
                response_1,
                prompt_2,
                response_2
            )

        writeResponseToFile(response)
        return response
    }
}

export default MetamorphicTestingService
