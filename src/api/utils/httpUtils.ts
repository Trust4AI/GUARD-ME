const sendRequestToGenie = async (
    genieBaseUrl: string,
    requestBody: object
): Promise<string> => {
    let response: Response

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
