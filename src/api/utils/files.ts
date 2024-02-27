import fs from 'fs'

const writeResponseToFile = (response: JSON) => {
    const date = new Date().toISOString().replace(/:/g, '-')
    fs.writeFileSync(
        './output/' + date + '.json',
        JSON.stringify(response, null, 4)
    )
}

export { writeResponseToFile }
