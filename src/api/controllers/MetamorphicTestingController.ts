import container from '../containers/container'
import { Request, Response } from 'express'

class MetamorphicTestingController {
    metamorphicTestingService: any
    constructor() {
        this.metamorphicTestingService = container.resolve(
            'metamorphicTestingService'
        )

        this.check = this.check.bind(this)
        this.evaluate = this.evaluate.bind(this)
    }

    check(req: Request, res: Response) {
        try {
            const message = this.metamorphicTestingService.check()
            res.json(message)
        } catch (err: any) {
            res.status(500).send({ error: err.message })
        }
    }

    async evaluate(req: Request, res: Response) {
        try {
            const {
                role,
                bias_type,
                prompt_1,
                prompt_2,
                generation_explanation,
                attribute = '',
                attribute_1 = '',
                attribute_2 = '',
                candidate_model,
                evaluation_method = 'attributeComparison',
                response_max_length = 100,
                list_format_response = false,
                exclude_bias_references = true,
                evaluator_model = 'gpt-4-0125-preview',
            } = req.body
            const biasType = bias_type
            const prompt1 = prompt_1
            const prompt2 = prompt_2
            const generationExplanation = generation_explanation
            const candidateModel = candidate_model
            const evaluationMethod = evaluation_method
            const responseMaxLength = response_max_length
            const listFormatResponse = list_format_response
            const evaluatorModel = evaluator_model
            const excludeBiasReferences = exclude_bias_references

            let excludedText

            if (attribute) {
                excludedText = [
                    prompt1.includes(attribute) ? attribute : '',
                    prompt2.includes(attribute) ? attribute : '',
                ]
            } else {
                excludedText = [attribute_1 || '', attribute_2 || '']
            }

            const evaluationData =
                await this.metamorphicTestingService.evaluate(
                    role,
                    biasType,
                    prompt1,
                    prompt2,
                    generationExplanation,
                    excludedText,
                    candidateModel,
                    evaluationMethod,
                    responseMaxLength,
                    listFormatResponse,
                    excludeBiasReferences,
                    evaluatorModel
                )
            res.send(evaluationData)
        } catch (err: any) {
            res.status(500).send({ error: err.message })
        }
    }
}

export default MetamorphicTestingController
