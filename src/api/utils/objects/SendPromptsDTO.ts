export class SendPromptsDTO {
    candidateModel: string
    evaluationMethod: string
    prompt1: string
    prompt2: string
    responseMaxLength: number
    listFormatResponse: boolean
    excludeBiasReferences: boolean
    excludedText: string[]
    temperature: number

    constructor(data: any) {
        this.candidateModel = data.candidateModel
        this.evaluationMethod = data.evaluationMethod
        this.prompt1 = data.prompt1
        this.prompt2 = data.prompt2
        this.responseMaxLength = data.responseMaxLength
        this.listFormatResponse = data.listFormatResponse
        this.excludeBiasReferences = data.excludeBiasReferences
        this.excludedText = data.excludedText
        this.temperature = data.temperature
    }
}
