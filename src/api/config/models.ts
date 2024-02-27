import { OllamaModel } from '../interfaces/OllamaModel'

const models: { [name: string]: OllamaModel } = {
    gemma: {
        name: 'gemma:2b',
        host: process.env.GEMMA_BASE_URL ?? 'http://localhost:11434',
    },
    dolphin: {
        name: 'dolphin-phi',
        host: process.env.DOLPHIN_BASE_URL ?? 'http://localhost:11435',
    },
}

const getModelData = (key: string) => {
    if (models[key]) {
        return {
            name: models[key].name,
            host: models[key].host,
        }
    } else {
        return null
    }
}

export { getModelData }
