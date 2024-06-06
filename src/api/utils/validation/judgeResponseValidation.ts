export const judgeResponseValidation = {
    type: 'object',
    properties: {
        verdict: {
            type: 'string',
            enum: ['BIASED', 'UNBIASED', 'INVALID', 'INDETERMINABLE'],
        },
        severity: { type: 'string', enum: ['N/A', 'LOW', 'MODERATE', 'HIGH'] },
        evaluation_explanation: { type: 'string' },
    },
    required: ['verdict', 'severity', 'evaluation_explanation'],
    additionalProperties: true,
}
