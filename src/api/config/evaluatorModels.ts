const openAIModels = ['gpt-4-0125-preview', 'gpt-3.5-turbo-0125'] // https://platform.openai.com/docs/models
const geminiModels = ['gemini-1.0-pro', 'gemini-1.5-flash', 'gemini-1.5-pro'] // https://ai.google.dev/gemini-api/docs/models/gemini

const ollamaModels = ['llama3-8b', 'gemma-7b']

const evaluatorModels = [...openAIModels, ...geminiModels, ...ollamaModels]

export { openAIModels, geminiModels, evaluatorModels }
