import { createContainer, asValue, asClass } from 'awilix'

import MetamorphicTestingRepository from '../repositories/MetamorphicTestingRepository'

import JudgeModelService from '../services/JudgeModelService'
import CandidateModelService from '../services/CandidateModelService.js'
import MetamorphicTestingService from '../services/MetamorphicTestingService'

function initContainer() {
    const container = createContainer()

    container.register({
        metamorphicTestingRepository: asValue(MetamorphicTestingRepository),
        judgeModelService: asClass(JudgeModelService).singleton(),
        candidateModelService: asClass(CandidateModelService).singleton(),
        metamorphicTestingService: asClass(
            MetamorphicTestingService
        ).singleton(),
    })
    return container
}

const container = initContainer()

export default container
