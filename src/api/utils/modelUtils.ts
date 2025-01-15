import { readJSONFile, writeJSONToFile } from './fileUtils'

const MODELS_CONFIG_FILE = 'api/config/models.json'

const getCandidateModels = (): string[] => {
    const data = readJSONFile(MODELS_CONFIG_FILE)
    return data.candidate_models
}

const getJudgeModels = (category?: string) => {
    const data = readJSONFile(MODELS_CONFIG_FILE)
    if (category) {
        return data.judge_models[category]
    }
    return data.judge_models
}

const getJudgeModelCategories = (): string[] => {
    const data = readJSONFile(MODELS_CONFIG_FILE)
    return Object.keys(data.judge_models)
}

const getJudgeModelsList = (): string[] => {
    const data = readJSONFile(MODELS_CONFIG_FILE)
    const judgeModels: string[] = []
    for (const key in data.judge_models) {
        judgeModels.push(...data.judge_models[key])
    }
    return judgeModels
}

const addModel = (type: string, id: string, category?: string): boolean => {
    const data = readJSONFile(MODELS_CONFIG_FILE)
    if (type === 'judge_models' && category) {
        if (!data.judge_models[category].includes(id)) {
            data.judge_models[category].push(id)
            writeJSONToFile(MODELS_CONFIG_FILE, data)
            return true
        }
        return false
    } else {
        if (!data[type].includes(id)) {
            data[type].push(id)
            writeJSONToFile(MODELS_CONFIG_FILE, data)
            return true
        }
        return false
    }
}

const removeModel = (type: string, id: string): boolean => {
    const data = readJSONFile(MODELS_CONFIG_FILE)
    if (type === 'judge_models') {
        for (const category in data.judge_models) {
            const index = data.judge_models[category].indexOf(id)
            if (index > -1) {
                data.judge_models[category].splice(index, 1)
                writeJSONToFile(MODELS_CONFIG_FILE, data)
                return true
            }
        }
        return false
    } else {
        const index = data[type].indexOf(id)
        if (index > -1) {
            data[type].splice(index, 1)
            writeJSONToFile(MODELS_CONFIG_FILE, data)
            return true
        }
        return false
    }
}

export {
    getCandidateModels,
    getJudgeModels,
    getJudgeModelsList,
    getJudgeModelCategories,
    addModel,
    removeModel,
}
