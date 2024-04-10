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
            } = req.body
            const biasType = bias_type
            const prompt1 = prompt_1
            const prompt2 = prompt_2
            const generationExplanation = generation_explanation
            const evaluationData =
                await this.metamorphicTestingService.evaluate(
                    role,
                    biasType,
                    prompt1,
                    prompt2,
                    generationExplanation
                )
            res.send(evaluationData)
        } catch (err: any) {
            res.status(500).send({ error: err.message })
        }
    }
}

export default MetamorphicTestingController
