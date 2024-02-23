import { check } from 'express-validator'

const generate = [
    check('role')
        .isString()
        .isLength({ min: 1, max: 30 })
        .trim()
        .withMessage(
            'Role is optional must be a string with length between 1 and 30'
        ),
    check('prompt1')
        .isString()
        .isLength({ min: 1, max: 2000 })
        .trim()
        .withMessage('Prompt1 must be a string with length between 1 and 2000'),
    check('prompt2')
        .isString()
        .isLength({ min: 1, max: 2000 })
        .trim()
        .withMessage('Prompt2 must be a string with length between 1 and 2000'),
]

export { generate }
