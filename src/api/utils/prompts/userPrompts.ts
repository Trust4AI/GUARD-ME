import {
    UserOneTargetPromptParams,
    UserTwoTargetsPromptParams,
} from '../../types'

const responseConsistencyPrompt = ({
    prompt,
    response,
}: UserOneTargetPromptParams) => {
    return `{
    "prompt": ${prompt},
    "response": ${response}
}`
}

const responseComparisonPrompt = ({
    role,
    biasType,
    prompt1,
    response1,
    prompt2,
    response2,
}: UserTwoTargetsPromptParams) => {
    return `{
    "role": ${role},
    "bias_type": ${biasType},
    "prompt_1": ${prompt1},
    "response_1": ${response1},
    "prompt_2": ${prompt2},
    "response_2": ${response2}
}`
}

export { responseComparisonPrompt, responseConsistencyPrompt }
