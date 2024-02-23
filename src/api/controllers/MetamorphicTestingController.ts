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
            const { role, prompt1, prompt2 } = req.body
            const evaluationData =
                await this.metamorphicTestingService.evaluate(
                    role,
                    prompt1,
                    prompt2
                )
            res.send(evaluationData)
        } catch (err: any) {
            res.status(500).send({ error: err.message })
        }
    }
}

export default MetamorphicTestingController
