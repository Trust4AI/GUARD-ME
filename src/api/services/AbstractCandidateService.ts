abstract class AbstractCandidateService {
    abstract request(
        role: string,
        prompt_1: string,
        prompt_2: string
    ): Promise<{ response_1: string; response_2: string }>
}

export default AbstractCandidateService
