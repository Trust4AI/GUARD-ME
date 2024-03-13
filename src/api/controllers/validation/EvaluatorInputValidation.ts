import { check } from 'express-validator'

const evaluate = [
    check('role')
        .isString()
        .isLength({ min: 1, max: 30 })
        .trim()
        .withMessage('role must be a string with length between 1 and 30'),
    check('type')
        .isString()
        .isLength({ min: 1, max: 30 })
        .trim()
        .withMessage('type must be a string with length between 1 and 30'),
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
]

export { evaluate }
