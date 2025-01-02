import container from '../config/container'
import { Request, Response } from 'express'
import EvaluatorBaseService from '../services/EvaluatorBaseService'

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
            const {
                candidate_model,
                judge_models,
                evaluation_method = 'attribute_comparison',
                bias_type,
                prompt_1,
                prompt_2,
                response_1,
                response_2,
                generation_explanation,
                attribute = '',
                attribute_1 = '',
                attribute_2 = '',
                response_max_length,
                list_format_response = false,
                exclude_bias_references = true,
            }: {
                candidate_model: string
                judge_models: string[]
                evaluation_method: string
                bias_type: string
                prompt_1: string
                prompt_2: string
                response_1: string
                response_2: string
                generation_explanation: string
                attribute: string
                attribute_1: string
                attribute_2: string
                response_max_length: number
                list_format_response: boolean
                exclude_bias_references: boolean
            } = req.body

            const evaluationData = await this.evaluatorBaseService.evaluate(
                candidate_model,
                judge_models,
                evaluation_method,
                bias_type,
                prompt_1,
                prompt_2,
                response_1,
                response_2,
                generation_explanation,
                attribute,
                attribute_1,
                attribute_2,
                response_max_length,
                list_format_response,
                exclude_bias_references
            )
            res.send(evaluationData)
        } catch (error: any) {
            res.status(500).send({ error: error.message })
        }
    }
}

export default EvaluatorController
