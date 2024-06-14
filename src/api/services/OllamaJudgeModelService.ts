import { getModelConfig } from '../config/models'
import { Ollama } from 'ollama'

class OllamaJudgeModelService{
    
    async fetchModelComparison(
        systemPrompt: string,
        userPrompt: string,
        jsonFormat = false,
        evaluatorModel: string        
    ): Promise<string> {       
        const modelData = getModelConfig(evaluatorModel)
        const model = modelData?.name ?? 'gemma:2b'
        const host = modelData?.host ?? 'http://172.0.0.1:11434'
        const ollama = new Ollama({ host })        
        console.log('Host:', host);
        console.log('Model:', model);
        console.log('User Prompt:', userPrompt);
        
        const requestbody={
            model: model,
            stream: false,
            messages: [
                {
                    role: 'system',
                    content: systemPrompt
                },
                {
                    role: 'user',
                    content: userPrompt,
                },
            ]
        }
        console.log("Request body: "+JSON.stringify(requestbody));
        try {
            const response = await fetch(host+"/api/chat", {
                method: "POST",                
                body: JSON.stringify(requestbody)
            });
    
            if (response.ok) {
                const jsonResponse = await response.json();
                console.log("Chat posted successfully!");
                console.log("Response from Ollama:", jsonResponse);
                return jsonResponse.message.content
            } else {
                console.error("Failed to post chat to Ollama", response.status, response.statusText);
            }
        } catch (error) {
            console.error("Error posting chat to Ollama:", error);
        }        
        return "Error posting chat to Ollama";
    }
    
}

export default OllamaJudgeModelService
