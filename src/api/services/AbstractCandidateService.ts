import container from '../containers/container'

abstract class AbstractCandidateService {
    httpClient: any
    constructor() {
        this.httpClient = container.resolve('httpClient')
    }
    abstract sendPromptsToModel(
        role: string,
        prompt_1: string,
        prompt_2: string
    ): Promise<{ response_1: string; response_2: string }>
}

export default AbstractCandidateService
