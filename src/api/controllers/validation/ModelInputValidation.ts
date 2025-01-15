import { check } from 'express-validator'
import {
    getCandidateModels,
    getJudgeModelCategories,
    getJudgeModelsList,
} from '../../utils/modelUtils'

const addCandidateModel = [
    check('id')
        .isString()
        .trim()
        .custom((value: string): boolean => {
            const candidateModels: string[] = getCandidateModels()
            if (candidateModels.includes(value)) {
                throw new Error(
                    `id must be unique and not one of the following values: [${candidateModels.join(
                        `, `
                    )}]. Please use a different id.`
                )
            }
            return true
        })
        .isLength({ min: 1, max: 30 })
        .withMessage(
            'id must be a string with length greater than 1 and less than 30'
        ),
]

const addJudgeModel = [
    check('id')
        .isString()
        .trim()
        .custom((value: string): boolean => {
            const judgeModels = getJudgeModelsList()
            if (judgeModels.includes(value)) {
                throw new Error(
                    `id must be unique and not one of the following values: [${judgeModels.join(
                        `, `
                    )}]. Please use a different id.`
                )
            }
            return true
        })
        .isLength({ min: 1, max: 30 })
        .withMessage(
            'id must be a string with length greater than 1 and less than 30'
        ),
    check('category')
        .optional()
        .isString()
        .trim()
        .custom((value: string): boolean => {
            const judgeModelCategories: string[] = getJudgeModelCategories()
            if (!judgeModelCategories.includes(value)) {
                throw new Error(
                    `category must be a string, if provided, with one of the following values: [${judgeModelCategories.join(
                        `, `
                    )}]`
                )
            }
            return true
        }),
]

export { addCandidateModel, addJudgeModel }
