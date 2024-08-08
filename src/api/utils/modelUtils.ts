import fs from 'fs/promises'

const MODELS_CONFIG_FILE = 'api/config/models.json'

const readFile = async () => {
    const data = await fs.readFile(MODELS_CONFIG_FILE, 'utf8')
    return JSON.parse(data)
}

const writeFile = async (data: any) => {
    const jsonData = JSON.stringify(data, null, 4)
    await fs.writeFile(MODELS_CONFIG_FILE, jsonData, 'utf8')
}

const getCandidateModels = async () => {
    const data = await readFile()
    return data.candidate_models
}

const getJudgeModels = async (category?: string) => {
    const data = await readFile()
    if (category) {
        return data.judge_models[category]
    }
    return data.judge_models
}

const getJudgeModelCategories = async () => {
    const data = await readFile()
    return Object.keys(data.judge_models)
}

const getJudgeModelsList = async () => {
    const data = await readFile()
    const judgeModels: string[] = []
    for (const key in data.judge_models) {
        judgeModels.push(...data.judge_models[key])
    }
    return judgeModels
}

const addModel = async (type: string, id: string, category?: string) => {
    const data = await readFile()
    if (type === 'judge_models' && category) {
        if (!data.judge_models[category].includes(id)) {
            data.judge_models[category].push(id)
            await writeFile(data)
            return true
        }
        return false
    } else {
        if (!data[type].includes(id)) {
            data[type].push(id)
            await writeFile(data)
            return true
        }
        return false
    }
}

const removeModel = async (type: string, id: string) => {
    const data = await readFile()
    if (type === 'judge_models') {
        for (const category in data.judge_models) {
            const index = data.judge_models[category].indexOf(id)
            if (index > -1) {
                data.judge_models[category].splice(index, 1)
                await writeFile(data)
                return true
            }
        }
        return false
    } else {
        const index = data[type].indexOf(id)
        if (index > -1) {
            data[type].splice(index, 1)
            await writeFile(data)
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
