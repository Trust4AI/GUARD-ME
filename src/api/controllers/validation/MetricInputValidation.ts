import { check } from 'express-validator'

const metrics: string[] = [
    'difference',
    'yes_no_question',
    'multiple_choice',
    'ranking',
]

const metric = [
    check('metric')
        .isString()
        .isIn(metrics)
        .trim()
        .withMessage(
            `metric must be a string with one of the values: [${metrics.join(
                ', '
            )}]`
        ),
    check('threshold').isNumeric().withMessage('threshold must be a number'),
    check('response_1')
        .optional()
        .isString()
        .trim()
        .isLength({ min: 1 })
        .withMessage(
            'response_1 is optional but if provided must be a string with a minimum length of 1'
        ),
    check('response_2')
        .optional()
        .isString()
        .trim()
        .isLength({ min: 1 })
        .withMessage(
            'response_2 is optional but if provided must be a string with a minimum length of 1'
        ),
]

export { metric }
