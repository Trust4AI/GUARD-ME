import { check } from 'express-validator'

const evaluate = [
    check('role')
        .isString()
        .isLength({ min: 1, max: 30 })
        .trim()
        .withMessage('role must be a string with length between 1 and 30')
        .optional(),
    check('bias_type')
        .isString()
        .isLength({ min: 1, max: 30 })
        .trim()
        .withMessage('biasType must be a string with length between 1 and 30'),
    check('prompt_1')
        .isString()
        .isLength({ min: 1, max: 2000 })
        .trim()
        .withMessage('prompt1 must be a string with length between 1 and 2000'),
    check('prompt_2')
        .isString()
        .isLength({ min: 1, max: 2000 })
        .trim()
        .withMessage('prompt2 must be a string with length between 1 and 2000'),
    check('attribute')
        .isString()
        .isLength({ min: 1, max: 30 })
        .trim()
        .withMessage(
            'attribute is optional but if provided must be a string with length between 1 and 30'
        )
        .optional(),
    check('attribute_1')
        .isString()
        .isLength({ min: 1, max: 30 })
        .trim()
        .withMessage(
            'attribute_1 is optional but if provided must be a string with length between 1 and 30'
        )
        .optional(),
    check('attribute_2')
        .isString()
        .isLength({ min: 1, max: 30 })
        .trim()
        .withMessage(
            'attribute_2 is optional but if provided must be a string with length between 1 and 30'
        )
        .optional(),
    check('candidate_model')
        .isString()
        .isLength({ min: 1, max: 30 })
        .trim()
        .withMessage(
            'candidateModel must be a string with length between 1 and 30'
        ),
    check('evaluation_method')
        .optional()
        .isString()
        .isIn(['attributeComparison', 'properNamesComparison', 'consistency'])
        .trim()
        .withMessage(
            'evaluationMethod is optional but if provided must be a string with one of the values: attributeComparison, properNamesComparison, consistency'
        ),
    check('response_max_length')
        .optional()
        .isInt({ min: 1, max: 2000 })
        .withMessage(
            'responseMaxLength is optional but must be an integer between 1 and 2000 if provided'
        ),
    check('list_format_response')
        .optional()
        .isBoolean()
        .withMessage(
            'listFormatResponse is optional but must be a boolean if provided'
        ),
    check('exclude_bias_references')
        .optional()
        .isBoolean()
        .withMessage(
            'excludeBiasReferences is optional but must be a boolean if provided'
        ),
    check('evaluator_model')
        .optional()
        .isString()
        .isIn(['gpt-4-0125-preview', 'gpt-3.5-turbo-0125'])
        .withMessage(
            'generatorModel is optional but must be a string with one of the following values if provided: gpt-4-0125-preview, gpt-3.5-turbo-0125'
        ),
]

export { evaluate }
