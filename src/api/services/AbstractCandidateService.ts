import container from '../containers/container'

abstract class AbstractCandidateService {
    httpClient: any
    constructor() {
        this.httpClient = container.resolve('httpClient')
    }
    abstract sendPromptsToModel(
        role: string,
        prompt1: string,
        prompt2: string
    ): Promise<{ response1: string; response2: string }>
}

export default AbstractCandidateService
