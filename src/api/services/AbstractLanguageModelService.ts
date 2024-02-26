abstract class LanguageModelService {
    abstract request(
        role: string,
        type: string,
        prompt_1: string,
        prompt_2: string
    ): Promise<JSON>
}

export default LanguageModelService
