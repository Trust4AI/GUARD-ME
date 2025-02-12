import container from '../config/container'
import { Request, Response } from 'express'
import MetricBaseService from '../services/MetricBaseService'

class MetricController {
    metricBaseService: MetricBaseService
    constructor() {
        this.metricBaseService = container.resolve('metricBaseService')
        this.evaluate = this.evaluate.bind(this)
    }

    async evaluate(req: Request, res: Response): Promise<void> {
        try {
            const { metric, threshold, response_1, response_2 } = req.body

            const evaluationData = await this.metricBaseService.evaluate(
                metric,
                threshold,
                response_1,
                response_2
            )
            res.send(evaluationData)
        } catch (error: any) {
            res.status(500).send({ error: error.message })
        }
    }
}

export default MetricController
