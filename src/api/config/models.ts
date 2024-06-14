import { OllamaModel } from '../interfaces/OllamaModel'

const models: { [name: string]: OllamaModel } = {
    'llama3-8b': {
        name: 'llama3:8b',
        host:
            process.env.OLLAMA_HOST ||
            (process.env.NODE_ENV === 'docker'
                ? 'http://llama3-8b:11435'
                : 'http://localhost:11434'),
    },
    'llama2-7b': {
        name: 'llama2:7b',
        host:
            process.env.OLLAMA_HOST ||
            (process.env.NODE_ENV === 'docker'
                ? 'http://llama2-7b:11436'
                : 'http://localhost:11434'),
    },
    'mistral-7b': {
        name: 'mistral:7b',
        host:
            process.env.OLLAMA_HOST ||
            (process.env.NODE_ENV === 'docker'
                ? 'http://mistral-7b:11437'
                : 'http://localhost:11434'),
    },
    'gemma-7b': {
        name: 'gemma:7b',
        host:
            process.env.OLLAMA_HOST ||
            (process.env.NODE_ENV === 'docker'
                ? 'http://gemma-7b:11438'
                : 'http://localhost:11434'),
    },
}

const getModelConfig = (key: string) => {
    if (models[key]) {
        return {
            name: models[key].name,
            host: models[key].host,
        }
    } else {
        return null
    }
}

export { getModelConfig }
