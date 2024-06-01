import container from '../containers/container'

abstract class AbstractCandidateService {
    httpClient: any
    constructor() {
        this.httpClient = container.resolve('httpClient')
    }
    abstract sendPromptsToModel(
        role: string,
        prompt1: string,
        prompt2: string,
        excludedText: Array<string>,
        candidateModel: string,
        evaluationMethod: string,
        responseMaxLength: number,
        listFormatResponse: boolean,
        excludeBiasReferences: boolean
    ): Promise<{ response1: string; response2: string }>
}

export default AbstractCandidateService
