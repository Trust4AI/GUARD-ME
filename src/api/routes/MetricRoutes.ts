import express from 'express'
import MetricController from '../controllers/MetricController'
import * as MetricInputValidation from '../controllers/validation/MetricInputValidation'
import { handleValidation } from '../middlewares/ValidationMiddleware'

const router = express.Router()
const metricController = new MetricController()

router
    .route('/evaluate')
    .post(
        MetricInputValidation.metric,
        handleValidation,
        metricController.evaluate
    )

export default router
