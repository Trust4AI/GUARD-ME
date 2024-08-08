import container from '../config/container'
import { Request, Response } from 'express'

class ModelController {
    modelBaseService: any
    constructor() {
        this.modelBaseService = container.resolve('modelBaseService')

        this.check = this.check.bind(this)
        this.indexCandidateModels = this.indexCandidateModels.bind(this)
        this.addCandidateModel = this.addCandidateModel.bind(this)
        this.removeCandidateModel = this.removeCandidateModel.bind(this)
        this.indexJudgeModels = this.indexJudgeModels.bind(this)
        this.addJudgeModel = this.addJudgeModel.bind(this)
        this.removeJudgeModel = this.removeJudgeModel.bind(this)
    }

    check(req: Request, res: Response) {
        try {
            const message = this.modelBaseService.check()
            res.json(message)
        } catch (error: any) {
            res.status(500).send({ error: error.message })
        }
    }

    async indexCandidateModels(req: Request, res: Response) {
        try {
            const candidateModels =
                await this.modelBaseService.indexCandidateModels()
            res.json(candidateModels)
        } catch (error: any) {
            res.status(500).send({ error: error.message })
        }
    }

    async addCandidateModel(req: Request, res: Response) {
        try {
            const { id } = req.body
            const model = await this.modelBaseService.addCandidateModel(id)
            res.json(model)
        } catch (error: any) {
            res.status(500).send({ error: error.message })
        }
    }

    async removeCandidateModel(req: Request, res: Response) {
        try {
            const { id } = req.params
            const result = await this.modelBaseService.removeCandidateModel(id)
            const message = result
                ? 'Successfully removed.'
                : 'Could not remove model.'
            res.send({ message })
        } catch (error: any) {
            res.status(500).send({ error: error.message })
        }
    }

    async indexJudgeModels(req: Request, res: Response) {
        try {
            const judgeModels = await this.modelBaseService.indexJudgeModels()
            res.json(judgeModels)
        } catch (error: any) {
            res.status(500).send({ error: error.message })
        }
    }

    async addJudgeModel(req: Request, res: Response) {
        try {
            const { id, category = 'ollama' } = req.body
            const model = await this.modelBaseService.addJudgeModel(
                id,
                category
            )
            res.json(model)
        } catch (error: any) {
            res.status(500).send({ error: error.message })
        }
    }

    async removeJudgeModel(req: Request, res: Response) {
        try {
            const { id } = req.params
            const result = await this.modelBaseService.removeJudgeModel(id)
            const message = result
                ? 'Successfully removed.'
                : 'Could not remove model.'
            res.send({ message })
        } catch (error: any) {
            res.status(500).send({ error: error.message })
        }
    }
}

export default ModelController
