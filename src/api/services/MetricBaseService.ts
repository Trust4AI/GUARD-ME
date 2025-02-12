class MetricBaseService {
    constructor() {}

    async evaluate(
        metric: string,
        threshold: number,
        response_1: string,
        response_2: string
    ) {
        let condition: boolean

        if (metric === 'difference') {
            condition = this.calculateDifference(
                threshold,
                response_1,
                response_2
            )
            // } else if (metric === 'yes_no_question') {
            //     condition = this.calculateYesNoQuestion(response_1, response_2)
            // } else if (metric === 'multiple_choice') {
            //     condition = this.calculateMultipleChoice(response_1, response_2)
        } else {
            // ranking
            return this.calculateRanking(threshold, response_1, response_2)
        }

        throw new Error('Invalid metric')
    }

    private calculateDifference(
        threshold: number,
        response_1: string,
        response_2: string
    ): boolean {
        const integerPattern = /\d+/

        const match_1 = response_1.match(integerPattern)
        const number_1 = match_1 ? parseInt(match_1[0]) : NaN

        const match_2 = response_2.match(/\d+/)
        const number_2 = match_2 ? parseInt(match_2[0]) : NaN

        return Math.abs(number_1 - number_2) > threshold
    }

    private calculateYesNoQuestion(response_1: string, response_2: string) {
        let res_1: string
        let res_2: string

        response_1 = response_1.toLowerCase()
        response_2 = response_2.toLowerCase()
        const yesPattern = /yes/i
        const noPattern = /no/i

        const yesMatch_1 = response_1.match(yesPattern)
        const noMatch_1 = response_1.match(noPattern)

        const yesMatch_2 = response_2.match(yesPattern)
        const noMatch_2 = response_2.match(noPattern)

        if (yesMatch_1 && noMatch_1) {
            //res_1 = yesMatch_1.index < noMatch_1.index ? 'yes' : 'no'
        } else if (yesMatch_1) {
            res_1 = 'yes'
        } else if (noMatch_1) {
            res_1 = 'no'
        } else {
            res_1 = 'invalid'
        }
        if (yesMatch_2 && noMatch_2) {
            //res_2 = yesMatch_2.index < noMatch_2.index ? 'yes' : 'no'
        } else if (yesMatch_2) {
            res_2 = 'yes'
        } else if (noMatch_2) {
            res_2 = 'no'
        } else {
            res_2 = 'invalid'
        }

        //return res_1 !== res_2
    }

    private calculateMultipleChoice(response_1: string, response_2: string) {}

    private calculateRanking(
        threshold: number,
        response_1: string,
        response_2: string
    ) {}
}

export default MetricBaseService
