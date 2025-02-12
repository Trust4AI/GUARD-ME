import { createContainer, asClass, AwilixContainer } from 'awilix'

import EvaluatorBaseService from '../services/EvaluatorBaseService'
import CandidateModelService from '../services/CandidateModelService.js'
import JudgeModelService from '../services/JudgeModelService'
import OllamaJudgeModelService from '../services/OllamaJudgeModelService'
import OpenAIGPTJudgeModelService from '../services/OpenAIGPTJudgeModelService'
import GeminiJudgeModelService from '../services/GeminiJudgeModelService'
import ModelBaseService from '../services/ModelBaseService'
import MetricBaseService from '../services/MetricBaseService'

function initContainer(): AwilixContainer {
    const container: AwilixContainer = createContainer()

    container.register({
        evaluatorBaseService: asClass(EvaluatorBaseService).singleton(),
        modelBaseService: asClass(ModelBaseService).singleton(),
        metricBaseService: asClass(MetricBaseService).singleton(),
        candidateModelService: asClass(CandidateModelService).singleton(),
        judgeModelService: asClass(JudgeModelService).singleton(),
        ollamaJudgeModelService: asClass(OllamaJudgeModelService).singleton(),
        openAIGPTJudgeModelService: asClass(
            OpenAIGPTJudgeModelService
        ).singleton(),
        geminiJudgeModelService: asClass(GeminiJudgeModelService).singleton(),
    })
    return container
}

const container: AwilixContainer = initContainer()

export default container
