import express from 'express'
import ModelController from '../controllers/ModelController'
import * as ModelInputValidation from '../controllers/validation/ModelInputValidation'
import { handleValidation } from '../middlewares/ValidationMiddleware'
import container from '../config/container'
import { checkModelExists } from '../middlewares/EntityMiddleware'

const router = express.Router()
const modelController = new ModelController()
const executorBaseService = container.resolve('modelBaseService')

/**
 * @swagger
 * components:
 *   schemas:
 *     Message:
 *       type: object
 *       required:
 *         - message
 *       properties:
 *         message:
 *           type: string
 *       example:
 *         message: The model routes are working properly!
 *     Error:
 *       type: object
 *       required:
 *         - error
 *       properties:
 *         error:
 *           type: string
 *       example:
 *         error: Internal Server Error
 *     ValidationError:
 *       type: object
 *       required:
 *         - type
 *         - value
 *         - msg
 *         - path
 *         - location
 *       properties:
 *         type:
 *           description: The type of the error
 *           type: string
 *           example: "field"
 *         value:
 *           description: The value of the field
 *           type: string
 *           example: ""
 *         msg:
 *           description: The error message
 *           type: string
 *           example: "prompt_2 must be a string with length between 1 and 2000"
 *         path:
 *           description: The name of the field
 *           type: string
 *           example: "prompt_2"
 *         location:
 *           description: The location of the error
 *           type: string
 *           example: "body"
 *     Model:
 *       type: string
 *       description: The unique identifier of the model
 *       example: "mistral-7b"
 *     CandidateModel:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier of the model
 *           example: "mistral-7b"
 *       example:
 *         id: mistral-7b
 *     JudgeModel:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier of the model
 *           example: "gpt-4-0125-preview"
 *         category:
 *           type: string
 *           description: The category of the model
 *           enum: [openai, gemini, ollama]
 *           example: "openai"
 *       example:
 *         id: gpt-4-0125-preview
 *         category: openai
 *     JudgeModelListFormat:
 *       type: object
 *       properties:
 *         openai:
 *           type: array
 *           description: The list of OpenAI models
 *           items:
 *             type: string
 *         gemini:
 *           type: array
 *           description: The list of Gemini models
 *           items:
 *             type: string
 *         ollama:
 *           type: array
 *           description: The list of Ollama models
 *           items:
 *             type: string
 *       example:
 *         openai:
 *           - "gpt-4-0125-preview"
 *           - "gpt-3.5-turbo-0125"
 *         gemini:
 *           - "gemini-1.0-pro"
 *           - "gemini-1.5-flash"
 *           - "gemini-1.5-pro"
 *         ollama:
 *           - "gemma-7b"
 *           - "lamma3-8b"
 */

/**
 * @swagger
 * tags:
 *  name: Models
 */

/**
 * @swagger
 * /models/check:
 *   get:
 *     summary: Check if the model routes are working properly
 *     tags: [Models]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.route('/check').get(modelController.check)

/**
 * @swagger
 * /models/candidate:
 *   get:
 *     summary: Get the list of the candidate models configured in GUARD-ME
 *     tags: [Models]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Model'
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   post:
 *     summary: Add a new candidate model to GUARD-ME configuration
 *     tags: [Models]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CandidateModel'
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CandidateModel'
 *       422:
 *         description: Validation Error
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ValidationError'
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router
    .route('/candidate')
    .get(modelController.indexCandidateModels)
    .post(
        ModelInputValidation.addCandidateModel,
        handleValidation,
        modelController.addCandidateModel
    )

/**
 * @swagger
 * /models/candidate/{id}:
 *   delete:
 *     summary: Remove a candidate model from GUARD-ME configuration
 *     tags: [Models]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the model
 *         schema:
 *           type: string
 *           example: "mistral-7b"
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/message'
 *       404:
 *         description: Model not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router
    .route('/candidate/:id')
    .delete(
        checkModelExists(executorBaseService, 'candidate', 'id'),
        modelController.removeCandidateModel
    )

/**
 * @swagger
 * /models/judge:
 *   get:
 *     summary: Get the list of the judge models configured in GUARD-ME
 *     tags: [Models]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JudgeModelListFormat'
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   post:
 *     summary: Add a new judge model to GUARD-ME configuration
 *     tags: [Models]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/JudgeModel'
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JudgeModel'
 *       422:
 *         description: Validation Error
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ValidationError'
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router
    .route('/judge')
    .get(modelController.indexJudgeModels)
    .post(
        ModelInputValidation.addJudgeModel,
        handleValidation,
        modelController.addJudgeModel
    )

/**
 * @swagger
 * /models/judge/{id}:
 *   delete:
 *     summary: Remove a judge model from GUARD-ME configuration
 *     tags: [Models]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the model
 *         schema:
 *           type: string
 *           example: "mistral-7b"
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/message'
 *       404:
 *         description: Model not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router
    .route('/judge/:id')
    .delete(
        checkModelExists(executorBaseService, 'judge', 'id'),
        modelController.removeJudgeModel
    )

export default router
