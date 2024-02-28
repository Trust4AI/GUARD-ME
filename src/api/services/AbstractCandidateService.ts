abstract class AbstractCandidateService {
    abstract sendPromptsToModel(
        role: string,
        prompt_1: string,
        prompt_2: string
    ): Promise<{ response_1: string; response_2: string }>

    abstract sendPromptToModel(
        systemPrompt: string,
        userPrompt: string
    ): Promise<string>
}

export default AbstractCandidateService
