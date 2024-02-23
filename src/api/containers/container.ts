import { createContainer, asValue, asClass } from 'awilix'

import MetamorphicTestingRepository from '../repositories/MetamorphicTestingRepository'

import ChatGPTService from '../services/ChatGPTService'
import MetamorphicTestingService from '../services/MetamorphicTestingService'

function initContainer() {
    const container = createContainer()

    container.register({
        metamorphicTestingRepository: asValue(MetamorphicTestingRepository),
        chatGPTService: asClass(ChatGPTService).singleton(),
        metamorphicTestingService: asClass(
            MetamorphicTestingService
        ).singleton(),
    })
    return container
}

const container = initContainer()

export default container
