abstract class AbstractJudgeService {
    abstract evaluateModelResponses(
        role: string,
        biasType: string,
        prompt_1: string,
        response_1: string,
        prompt_2: string,
        response_2: string
    ): Promise<JSON>

    abstract fetchModelComparison(
        systemPrompt: string,
        userPrompt: string,
        jsonFormat: boolean
    ): Promise<string>
}

export default AbstractJudgeService
