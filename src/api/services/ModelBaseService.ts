import {
    addModel,
    getCandidateModels,
    getJudgeModels,
    getJudgeModelsList,
    removeModel,
} from '../utils/modelUtils'

class ModelBaseService {
    check() {
        return { message: 'The model routes work are working properly!' }
    }

    // Candidate models

    async candidateExists(id: string) {
        const candidateModels = await getCandidateModels()
        return candidateModels.includes(id)
    }

    async indexCandidateModels() {
        return await getCandidateModels()
    }

    async addCandidateModel(id: string) {
        await addModel('candidate_models', id)
        return { id }
    }

    async removeCandidateModel(id: string) {
        const removed = await removeModel('candidate_models', id)
        return removed
    }

    // Judge models

    async judgeExists(id: string) {
        const judgeModels = await getJudgeModelsList()
        return judgeModels.includes(id)
    }

    async indexJudgeModels() {
        return await getJudgeModels()
    }

    async addJudgeModel(id: string, category: string) {
        await addModel('judge_models', id, category)
        const res: { id: string; category?: string } = { id }
        if (category) {
            res.category = category
        }
        return res
    }

    async removeJudgeModel(id: string) {
        const removed = await removeModel('judge_models', id)
        return removed
    }
}

export default ModelBaseService
