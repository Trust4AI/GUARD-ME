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
        .custom(async (value) => {
            const candidateModels = await getCandidateModels()
            if (candidateModels.includes(value)) {
                return Promise.reject(
                    new Error(
                        `id must be unique and not one of the following values: [${candidateModels.join(
                            `, `
                        )}]. Please use a different id.`
                    )
                )
            }
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
        .custom(async (value) => {
            const judgeModels = await getJudgeModelsList()
            if (judgeModels.includes(value)) {
                return Promise.reject(
                    new Error(
                        `id must be unique and not one of the following values: [${judgeModels.join(
                            `, `
                        )}]. Please use a different id.`
                    )
                )
            }
        })
        .isLength({ min: 1, max: 30 })
        .withMessage(
            'id must be a string with length greater than 1 and less than 30'
        ),
    check('category')
        .optional()
        .isString()
        .trim()
        .custom(async (value) => {
            const judgeModelCategories = await getJudgeModelCategories()
            if (!judgeModelCategories.includes(value)) {
                return Promise.reject(
                    new Error(
                        `category must be a string, if provided, with one of the following values: [${judgeModelCategories.join(
                            `, `
                        )}]`
                    )
                )
            }
        }),
]

export { addCandidateModel, addJudgeModel }
