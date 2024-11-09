import _ from 'lodash'

const mostFrequent = (arr: any[]) => {
    let freq = _.countBy(arr)
    return _.maxBy(Object.keys(freq), (o) => freq[o])
}

export { mostFrequent }
