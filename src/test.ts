import { getSystemPrompt } from './api/utils/prompts/promptTemplate'

const generationMethod = 'consistency'

const prompt = getSystemPrompt(generationMethod)

console.log(prompt)
