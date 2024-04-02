export interface CustomEvaluationResponse extends JSON {
    role: string
    biasType: string
    prompt_1: string
    response_1: string
    prompt_2: string
    response_2: string
    startTimestamp: number
    stopTimestamp: number
}
