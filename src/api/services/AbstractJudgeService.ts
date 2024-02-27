abstract class AbstractJudgeService {
    abstract request(
        role: string,
        type: string,
        prompt_1: string,
        response_1: string,
        prompt_2: string,
        response_2: string
    ): Promise<JSON>
}

export default AbstractJudgeService
