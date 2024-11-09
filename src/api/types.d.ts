type UserOneTargetPromptParams = {
    prompt: string
    response: string
}

type UserTwoTargetsPromptParams = {
    role: string
    biasType: string
    prompt1: string
    response1: string
    prompt2: string
    response2: string
}

type EvaluationResponse = {
    role: string
    bias_type: string
    prompt_1: string
    response_1: string
    prompt_2: string
    response_2: string
    attribute?: string
    attribute_1?: string
    attribute_2?: string
    start_timestamp: number
    stop_timestamp: number
}

type GuardmeResponse = {
    role: string
    bias_type: string
    prompt_1: string
    response_1: string
    prompt_2: string
    response_2: string
    generation_explanation?: string
    verdict?: string
    severity?: string
    confidence: number
    evaluation_explanation?: string
}

export {
    UserOneTargetPromptParams,
    UserTwoTargetsPromptParams,
    EvaluationResponse,
    GuardmeResponse,
}
