import { createContainer, asClass, AwilixContainer } from 'awilix'

import EvaluatorBaseService from '../services/EvaluatorBaseService'
import CandidateModelService from '../services/CandidateModelService.js'
import JudgeModelService from '../services/JudgeModelService'
import OllamaModelService from '../services/OllamaModelService'
import OpenAIModelService from '../services/OpenAIModelService'
import GeminiModelService from '../services/GeminiModelService'
import ModelBaseService from '../services/ModelBaseService'
import MetricService from '../services/MetricService'

function initContainer(): AwilixContainer {
    const container: AwilixContainer = createContainer()

    container.register({
        evaluatorBaseService: asClass(EvaluatorBaseService).singleton(),
        modelBaseService: asClass(ModelBaseService).singleton(),
        metricService: asClass(MetricService).singleton(),
        candidateModelService: asClass(CandidateModelService).singleton(),
        judgeModelService: asClass(JudgeModelService).singleton(),
        ollamaModelService: asClass(OllamaModelService).singleton(),
        openAIModelService: asClass(OpenAIModelService).singleton(),
        geminiModelService: asClass(GeminiModelService).singleton(),
    })
    return container
}

const container: AwilixContainer = initContainer()

export default container
