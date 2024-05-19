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
            'attribute1 is optional but if provided must be a string with length between 1 and 30'
        )
        .optional(),
    check('attribute_2')
        .isString()
        .isLength({ min: 1, max: 30 })
        .trim()
        .withMessage(
            'attribute2 is optional but if provided must be a string with length between 1 and 30'
        )
        .optional(),
]

export { evaluate }
