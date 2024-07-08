import { check } from 'express-validator'
import { evaluatorModels } from '../../config/evaluatorModels'
import { evaluationMethods } from '../../config/evaluationMethods'
import { candidateModels } from '../../config/candidateModels'

const evaluate = [
    check('candidate_model')
        .isString()
        .isIn(candidateModels)
        .trim()
        .withMessage(
            `candidate_model must be a string with one of the following values: ${candidateModels.join(
                ', '
            )}`
        ),
    check('evaluator_model')
        .isString()
        .isIn(evaluatorModels)
        .trim()
        .withMessage(
            `evaluator_model must be a string with one of the following values: ${evaluatorModels.join(
                ', '
            )}`
        ),
    check('evaluation_method')
        .optional()
        .isString()
        .isIn(evaluationMethods)
        .trim()
        .withMessage(
            `evaluation_method is optional but if provided must be a string with one of the values: ${evaluationMethods.join(
                ', '
            )}`
        ),
    check('role')
        .optional()
        .isString()
        .isLength({ min: 1, max: 30 })
        .trim()
        .withMessage(
            'role is optional but if provided must be a string with length between 1 and 30'
        ),
    check('bias_type')
        .isString()
        .isLength({ min: 1, max: 30 })
        .trim()
        .withMessage('bias_type must be a string with length between 1 and 30'),
    check('prompt_1')
        .isString()
        .isLength({ min: 1, max: 2000 })
        .trim()
        .withMessage(
            'prompt_1 must be a string with length between 1 and 2000'
        ),
    check('prompt_2')
        .isString()
        .isLength({ min: 1, max: 2000 })
        .trim()
        .withMessage(
            'prompt_2 must be a string with length between 1 and 2000'
        ),
    check('attribute')
        .optional()
        .isString()
        .isLength({ min: 1, max: 30 })
        .trim()
        .withMessage(
            'attribute is optional but if provided must be a string with length between 1 and 30'
        ),
    check('attribute_1')
        .optional()
        .isString()
        .isLength({ min: 1, max: 30 })
        .trim()
        .withMessage(
            'attribute_1 is optional but if provided must be a string with length between 1 and 30'
        ),
    check('attribute_2')
        .optional()
        .isString()
        .isLength({ min: 1, max: 30 })
        .trim()
        .withMessage(
            'attribute_2 is optional but if provided must be a string with length between 1 and 30'
        ),
    check('response_max_length')
        .optional()
        .custom(
            (value) =>
                value === -1 ||
                (Number.isInteger(value) && value >= 1 && value <= 2000)
        )
        .withMessage(
            'response_max_length is optional but must be an integer between 1 and 2000 or -1 if provided'
        ),
    check('list_format_response')
        .optional()
        .isBoolean()
        .withMessage(
            'list_format_response is optional but must be a boolean if provided'
        ),
    check('exclude_bias_references')
        .optional()
        .isBoolean()
        .withMessage(
            'exclude_bias_references is optional but must be a boolean if provided'
        ),
]

export { evaluate }
