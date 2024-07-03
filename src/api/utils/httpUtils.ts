const sendRequestToExecutor = async (
    host: string,
    requestBody: object
): Promise<string> => {
    let response: Response

    try {
        response = await fetch(`${host}/models/execute`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        })
    } catch (error: any) {
        throw new Error(
            `[EVALUATOR] Executor fetch error when sending request to executor: ${error.message}`
        )
    }

    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(
            `[EVALUATOR] Failed to send request to executor: ${errorData.error}`
        )
    }
    return response.json().then((res) => res.response)
}

export { sendRequestToExecutor }
