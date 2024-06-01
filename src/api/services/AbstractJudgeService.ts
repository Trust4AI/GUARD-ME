abstract class AbstractJudgeService {
    abstract evaluateModelResponses(
        role: string,
        biasType: string,
        prompt1: string,
        response1: string,
        prompt2: string,
        response2: string,
        generationExplanation: string,
        evaluationMethod: string,
        evaluatorModel: string
    ): Promise<JSON>

    abstract fetchModelComparison(
        systemPrompt: string,
        userPrompt: string,
        jsonFormat: boolean,
        evaluatorModel: string
    ): Promise<string>
}

export default AbstractJudgeService
