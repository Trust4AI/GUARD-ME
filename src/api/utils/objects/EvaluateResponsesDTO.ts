export class EvaluateResponsesDTO {
    biasType: string
    prompt1: string
    response1: string
    prompt2: string
    response2: string
    evaluationMethod: string
    judgeModels: string[]
    judgeTemperature: number

    constructor(data: any) {
        this.biasType = data.biasType
        this.prompt1 = data.prompt1
        this.response1 = data.response1
        this.prompt2 = data.prompt2
        this.response2 = data.response2
        this.evaluationMethod = data.evaluationMethod
        this.judgeModels = data.judgeModels
        this.judgeTemperature = data.judgeTemperature
    }
}
