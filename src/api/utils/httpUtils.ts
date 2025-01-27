import { ProxyAgent } from 'undici'
import config from '../config/config'

const sendRequestToGenie = async (
    genieBaseUrl: string,
    requestBody: object
): Promise<string> => {
    let response: Response
    const proxyURL: string = config.proxyURL

    try {
        const fetchContent: RequestInit & {
            dispatcher?: ProxyAgent
        } = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        }

        if (proxyURL) {
            const dispatcher = new ProxyAgent(proxyURL)
            fetchContent.dispatcher = dispatcher
        }

        response = await fetch(`${genieBaseUrl}/models/execute`, fetchContent)
    } catch (error: any) {
        throw new Error(
            `[GUARD-ME] Fetch error when sending request to GENIE: ${error.message}`
        )
    }

    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(
            `[GUARD-ME] Failed to send request to GENIE: ${errorData.error}`
        )
    }
    return response.json().then((res) => res.response)
}

export { sendRequestToGenie }
