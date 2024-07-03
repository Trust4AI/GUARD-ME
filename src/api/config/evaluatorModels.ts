const openAIModels = ['gpt-4-0125-preview', 'gpt-3.5-turbo-0125'] // https://platform.openai.com/docs/models
const ollamaModels = ['llama3-8b', 'gemma-7b']

const evaluatorModels = [...openAIModels, ...ollamaModels]

export { openAIModels, evaluatorModels }
