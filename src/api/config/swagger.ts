import swaggerjsdoc, { Options } from 'swagger-jsdoc'
import yaml from 'yaml'
import fs from 'fs'

const port: string = process.env.PORT || '8001'
const swaggerJsDoc = swaggerjsdoc

const swaggerOptions: Options = {
    definition: {
        openapi: '3.1.0',
        info: {
            version: '1.0.0',
            title: 'GUARD-ME: AI-guided Evaluator for Bias Detection using Metamorphic Testing',
            description:
                'GUARD-ME evaluates bias in AI-enabled search engines by evaluating the responses to the source and follow-up test cases. It utilizes Large Language Models (LLMs) to detect any bias and ensure that these systems adhere to ethical standards.',
            contact: {
                name: 'Trust4AI Team',
                email: '',
                url: 'https://trust4ai.github.io/trust4ai/',
            },
            license: {
                name: 'GNU General Public License v3.0',
                url: 'https://github.com/Trust4AI/GUARD-ME/blob/main/LICENSE',
            },
        },
        servers: [
            {
                url: `http://localhost:${port}/api/v1/`,
            },
        ],
    },
    apis: ['./api/routes/ModelRoutes.ts', './api/routes/EvaluatorRoutes.ts'],
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)

const yamlString: string = yaml.stringify(swaggerDocs, {})
fs.writeFileSync('../docs/openapi/spec.yaml', yamlString)

export { swaggerDocs }
