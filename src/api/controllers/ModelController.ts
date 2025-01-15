import container from '../config/container'
import { Request, Response } from 'express'
import ModelBaseService from '../services/ModelBaseService'

class ModelController {
    modelBaseService: ModelBaseService
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

    check(req: Request, res: Response): void {
        try {
            const message = this.modelBaseService.check()
            res.json(message)
        } catch (error: any) {
            res.status(500).send({ error: error.message })
        }
    }

    indexCandidateModels(req: Request, res: Response): void {
        try {
            const candidateModels: string[] =
                this.modelBaseService.indexCandidateModels()
            res.json(candidateModels)
        } catch (error: any) {
            res.status(500).send({ error: error.message })
        }
    }

    addCandidateModel(req: Request, res: Response): void {
        try {
            const { id } = req.body
            const model = this.modelBaseService.addCandidateModel(id)
            res.json(model)
        } catch (error: any) {
            res.status(500).send({ error: error.message })
        }
    }

    removeCandidateModel(req: Request, res: Response) {
        try {
            const { id } = req.params
            const result: boolean =
                this.modelBaseService.removeCandidateModel(id)
            const message = result
                ? 'Successfully removed.'
                : 'Could not remove model.'
            res.send({ message })
        } catch (error: any) {
            res.status(500).send({ error: error.message })
        }
    }

    indexJudgeModels(req: Request, res: Response): void {
        try {
            const judgeModels = this.modelBaseService.indexJudgeModels()
            res.json(judgeModels)
        } catch (error: any) {
            res.status(500).send({ error: error.message })
        }
    }

    addJudgeModel(req: Request, res: Response): void {
        try {
            const { id, category = 'ollama' } = req.body
            const model = this.modelBaseService.addJudgeModel(id, category)
            res.json(model)
        } catch (error: any) {
            res.status(500).send({ error: error.message })
        }
    }

    removeJudgeModel(req: Request, res: Response): void {
        try {
            const { id } = req.params
            const result: boolean = this.modelBaseService.removeJudgeModel(id)
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
