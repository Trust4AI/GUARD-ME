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

export { UserOneTargetPromptParams, UserTwoTargetsPromptParams }
