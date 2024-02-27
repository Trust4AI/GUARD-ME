import swaggerjsdoc from 'swagger-jsdoc'
import yaml from 'yaml'
import fs from 'fs'

const swaggerJsDoc = swaggerjsdoc

const swaggerOptions = {
    definition: {
        openapi: '3.1.0',
        info: {
            version: '1.0.0',
            title: 'Bias Evaluator LLM - API',
            description:
                'Prompt/search term evaluator for bias testing based on the use of LLMs.',
            contact: {
                name: 'Trust4AI Team',
                email: '',
                url: 'https://trust4ai.github.io/trust4ai/',
            },
            license: {
                name: 'GNU General Public License v3.0',
                url: 'https://github.com/Trust4AI/trust4ai-bias-evaluator-llm/blob/main/LICENSE',
            },
        },
        servers: [
            {
                url: 'http://localhost:8000/v1/metamorphicTesting/',
            },
        ],
    },
    apis: ['./api/routes/MetamorphicTestingRoutes.ts'],
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)

const yamlString: string = yaml.stringify(swaggerDocs, {})
fs.writeFileSync('../docs/openapi/spec.yaml', yamlString)

export { swaggerDocs }
