import { check, body } from 'express-validator'
import { evaluationMethods } from '../../config/evaluationMethods'
import { getCandidateModels, getJudgeModelsList } from '../../utils/modelUtils'

const evaluate = [
    check('candidate_model')
        .optional()
        .isString()
        .trim()
        .custom(async (value) => {
            const candidateModels = await getCandidateModels()
            if (value) {
                if (!candidateModels.includes(value)) {
                    throw new Error(
                        `candidate_model must be a string, if provided, with one of the following values: [${candidateModels.join(
                            ', '
                        )}].`
                    )
                }
            }
            return true
        }),
    check('judge_models')
        .isArray()
        .withMessage('judge_models must be an array of strings')
        .custom(async (value) => {
            const judgeModels = await getJudgeModelsList()
            if (value) {
                const invalidModels = value.filter(
                    (model: string) => !judgeModels.includes(model)
                )
                if (invalidModels.length > 0) {
                    throw new Error(
                        `Invalid judge models: ${invalidModels.join(
                            ', '
                        )}. Valid options are: [${judgeModels.join(', ')}].`
                    )
                } else if (value.length % 2 === 0) {
                    throw new Error(`The number of judge models must be odd.`)
                }
            }
            return true
        }),
    check('evaluation_method')
        .optional()
        .isString()
        .isIn(evaluationMethods)
        .trim()
        .withMessage(
            `evaluation_method is optional but if provided must be a string with one of the values: [${evaluationMethods.join(
                ', '
            )}]`
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
    check('response_1')
        .optional()
        .isString()
        .isLength({ min: 1 })
        .trim()
        .withMessage('response_1 is optional but if provided must be a string'),
    check('response_2')
        .optional()
        .isString()
        .isLength({ min: 1 })
        .trim()
        .withMessage('response_2 is optional but if provided must be a string'),
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
        .isInt({ min: 1, max: 2000 })
        .withMessage(
            'response_max_length is optional but must be an integer between 1 and 2000 if provided'
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
    body().custom((value, { req }) => {
        const {
            candidate_model,
            evaluation_method,
            response_1,
            response_2,
            attribute,
            attribute_1,
            attribute_2,
        } = req.body

        if (
            (candidate_model && (response_1 || response_2)) ||
            (!candidate_model && (!response_1 || !response_2)) ||
            (candidate_model && response_1 && response_2) ||
            (!candidate_model && !response_1 && !response_2)
        ) {
            throw new Error(
                'You must provide either "candidate_model" or both "response_1" and "response_2", but not all three or none.'
            )
        } else if (
            (attribute && attribute_1) ||
            (attribute && attribute_2) ||
            (!attribute && (!attribute_1 || !attribute_2)) ||
            (attribute && attribute_1 && attribute_2)
        ) {
            throw new Error(
                'You must provide either "attribute" or both "attribute_1" and "attribute_2", but not all three or none.'
            )
        }
        return true
    }),
]

export { evaluate }
