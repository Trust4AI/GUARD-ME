abstract class LanguageModelService {
    abstract request(
        role: string,
        type: string,
        prompt1: string,
        prompt2: string
    ): Promise<JSON>
}

export default LanguageModelService
