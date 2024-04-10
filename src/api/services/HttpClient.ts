import axios from 'axios'

class HttpClient {
    async post(url: string, data: any, headers: any) {
        return axios
            .post(url, data, headers)
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                console.error(error)
                throw new Error(error.errors[0])
            })
    }
}

export default HttpClient
