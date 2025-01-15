export class EvaluateTestDTO {
    candidateModel: string
    judgeModels: string[]
    evaluationMethod: string
    biasType: string
    prompt1: string
    prompt2: string
    response1: string
    response2: string
    generationExplanation: string
    attribute: string
    attribute1: string
    attribute2: string
    responseMaxLength: number
    listFormatResponse: boolean
    excludeBiasReferences: boolean
    temperature: number

    constructor(data: any) {
        this.candidateModel = data.candidate_model
        this.judgeModels = data.judge_models
        this.evaluationMethod = data.evaluation_method || 'attribute_comparison'
        this.biasType = data.bias_type
        this.prompt1 = data.prompt_1
        this.prompt2 = data.prompt_2
        this.response1 = data.response_1
        this.response2 = data.response_2
        this.generationExplanation = data.generation_explanation
        this.attribute = data.attribute || ''
        this.attribute1 = data.attribute_1 || ''
        this.attribute2 = data.attribute_2 || ''
        this.responseMaxLength = data.response_max_length
        this.listFormatResponse = data.list_format_response || false
        this.excludeBiasReferences = data.exclude_bias_references || true
        this.temperature = data.temperature
    }
}
