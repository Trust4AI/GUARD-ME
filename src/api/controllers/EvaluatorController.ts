import container from '../config/container'
import { Request, Response } from 'express'
import EvaluatorBaseService from '../services/EvaluatorBaseService'
import { EvaluateTestDTO } from '../utils/objects/EvaluateTestDTO'

class EvaluatorController {
    evaluatorBaseService: EvaluatorBaseService
    constructor() {
        this.evaluatorBaseService = container.resolve('evaluatorBaseService')

        this.check = this.check.bind(this)
        this.evaluate = this.evaluate.bind(this)
    }

    check(req: Request, res: Response): void {
        try {
            const message = this.evaluatorBaseService.check()
            res.json(message)
        } catch (error: any) {
            res.status(500).send({ error: error.message })
        }
    }

    async evaluate(req: Request, res: Response): Promise<void> {
        try {
            const dto: EvaluateTestDTO = new EvaluateTestDTO(req.body)

            const evaluationData = await this.evaluatorBaseService.evaluate(dto)
            res.send(evaluationData)
        } catch (error: any) {
            res.status(500).send({ error: error.message })
        }
    }
}

export default EvaluatorController
