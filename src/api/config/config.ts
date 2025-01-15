import './loadEnv'

const config = {
    port: process.env.PORT || '8001',
    maxRetries: process.env.MAX_RETRIES || '5',
    debugMode: process.env.DEBUG_MODE === 'true',
    geminiAPIKey: process.env.GEMINI_API_KEY || '',
    openaiAPIKey: process.env.OPENAI_API_KEY || '',
    genieBaseUrl: process.env.GENIE_BASE_URL || 'http://localhost:8081/api/v1',
}

export default config
