import express from 'express'
import ModelController from '../controllers/ModelController'
import * as ModelInputValidation from '../controllers/validation/ModelInputValidation'
import { handleValidation } from '../middlewares/ValidationMiddleware'
import container from '../config/container'
import { checkModelExists } from '../middlewares/EntityMiddleware'

const router = express.Router()
const modelController = new ModelController()
const executorBaseService = container.resolve('modelBaseService')

router.route('/check').get(modelController.check)

router
    .route('/candidate')
    .get(modelController.indexCandidateModels)
    .post(
        ModelInputValidation.addCandidateModel,
        handleValidation,
        modelController.addCandidateModel
    )
    .delete(
        checkModelExists(executorBaseService, 'candidate', 'id'),
        modelController.removeCandidateModel
    )

router
    .route('/candidate/:id')
    .delete(
        checkModelExists(executorBaseService, 'candidate', 'id'),
        modelController.removeCandidateModel
    )
router
    .route('/judge')
    .get(modelController.indexJudgeModels)
    .post(
        ModelInputValidation.addJudgeModel,
        handleValidation,
        modelController.addJudgeModel
    )

router
    .route('/judge/:id')
    .delete(
        checkModelExists(executorBaseService, 'judge', 'id'),
        modelController.removeJudgeModel
    )

export default router
