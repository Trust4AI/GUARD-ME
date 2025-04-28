const sendRequestToGenie = async (
    genieBaseUrl: string,
    requestBody: { temperature?: number; [key: string]: any }
): Promise<string> => {
    let response: Response

    if (requestBody.temperature === -1) {
        delete requestBody.temperature
    }

    try {
        response = await fetch(`${genieBaseUrl}/models/execute`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        })
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
