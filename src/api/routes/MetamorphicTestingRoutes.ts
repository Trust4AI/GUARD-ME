import express from 'express'
import MetamorphicTestingController from '../controllers/MetamorphicTestingController'
import * as GeneratorInputValidation from '../controllers/validation/EvaluatorInputValidation'
import { handleValidation } from '../middlewares/ValidationMiddleware'

const router = express.Router()
const metamorphicTestingController = new MetamorphicTestingController()

router.route('/check').get(metamorphicTestingController.check)
router
    .route('/evaluate')
    .post(
        GeneratorInputValidation.generate,
        handleValidation,
        metamorphicTestingController.evaluate
    )

export default router
