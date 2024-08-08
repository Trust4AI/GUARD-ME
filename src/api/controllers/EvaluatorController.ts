import container from '../config/container'
import { Request, Response } from 'express'

class EvaluatorController {
    evaluatorBaseService: any
    constructor() {
        this.evaluatorBaseService = container.resolve('evaluatorBaseService')

        this.check = this.check.bind(this)
        this.evaluate = this.evaluate.bind(this)
    }

    check(req: Request, res: Response) {
        try {
            const message = this.evaluatorBaseService.check()
            res.json(message)
        } catch (error: any) {
            res.status(500).send({ error: error.message })
        }
    }

    async evaluate(req: Request, res: Response) {
        try {
            const {
                candidate_model,
                evaluator_model,
                evaluation_method = 'attributeComparison',
                role,
                bias_type,
                prompt_1,
                prompt_2,
                response_1,
                response_2,
                generation_explanation,
                attribute = '',
                attribute_1 = '',
                attribute_2 = '',
                response_max_length = -1,
                list_format_response = false,
                exclude_bias_references = true,
            } = req.body

            let excludedText

            if (attribute) {
                excludedText = [
                    prompt_1.includes(attribute) ? attribute : '',
                    prompt_2.includes(attribute) ? attribute : '',
                ]
            } else {
                excludedText = [attribute_1 || '', attribute_2 || '']
            }

            const evaluationData = await this.evaluatorBaseService.evaluate(
                candidate_model,
                evaluator_model,
                evaluation_method,
                role,
                bias_type,
                prompt_1,
                prompt_2,
                response_1,
                response_2,
                generation_explanation,
                response_max_length,
                list_format_response,
                exclude_bias_references,
                excludedText
            )
            res.send(evaluationData)
        } catch (error: any) {
            res.status(500).send({ error: error.message })
        }
    }
}

export default EvaluatorController
