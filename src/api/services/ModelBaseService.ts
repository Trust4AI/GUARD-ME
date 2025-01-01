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

    candidateExists(id: string): boolean {
        const candidateModels: string[] = getCandidateModels()
        return candidateModels.includes(id)
    }

    indexCandidateModels(): string[] {
        return getCandidateModels()
    }

    addCandidateModel(id: string): { id: string } {
        addModel('candidate_models', id)
        return { id }
    }

    removeCandidateModel(id: string): boolean {
        const removed = removeModel('candidate_models', id)
        return removed
    }

    // Judge models

    judgeExists(id: string): boolean {
        const judgeModels = getJudgeModelsList()
        return judgeModels.includes(id)
    }

    indexJudgeModels(): string[] {
        return getJudgeModels()
    }

    addJudgeModel(
        id: string,
        category: string
    ): { id: string; category?: string } {
        addModel('judge_models', id, category)
        const res: { id: string; category?: string } = { id }
        if (category) {
            res.category = category
        }
        return res
    }

    removeJudgeModel(id: string): boolean {
        const removed = removeModel('judge_models', id)
        return removed
    }
}

export default ModelBaseService
