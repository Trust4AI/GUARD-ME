import container from '../containers/container'
import fs from 'fs'

class MetamorphicTestingService {
    chatGPTService: any
    constructor() {
        this.chatGPTService = container.resolve('chatGPTService')
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
        const response: JSON = await this.chatGPTService.request(
            role,
            type,
            prompt_1,
            prompt_2
        )

        const date = new Date().toISOString().replace(/:/g, '-')
        fs.writeFileSync(
            './output/' + date + '.json',
            JSON.stringify(response, null, 4)
        )
        return response
    }
}

export default MetamorphicTestingService
