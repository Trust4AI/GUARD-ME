import { createContainer, asClass } from 'awilix'

import EvaluatorBaseService from '../services/EvaluatorBaseService'
import CandidateModelService from '../services/CandidateModelService.js'
import JudgeModelService from '../services/JudgeModelService'
import OllamaJudgeModelService from '../services/OllamaJudgeModelService'
import OpenAIGPTJudgeModelService from '../services/OpenAIGPTJudgeModelService'

function initContainer() {
    const container = createContainer()

    container.register({
        evaluatorBaseService: asClass(EvaluatorBaseService).singleton(),
        candidateModelService: asClass(CandidateModelService).singleton(),
        judgeModelService: asClass(JudgeModelService).singleton(),
        ollamaJudgeModelService: asClass(OllamaJudgeModelService).singleton(),
        openAIGPTJudgeModelService: asClass(
            OpenAIGPTJudgeModelService
        ).singleton(),
    })
    return container
}

const container = initContainer()

export default container
