import express, { Express } from 'express'
import cors from 'cors'
import swaggerui from 'swagger-ui-express'
import metamorphicTesting from './routes/MetamorphicTestingRoutes'
import { swaggerDocs } from './config/swagger'
import './config/loadEnv'

const app: Express = express()
const API_VERSION = '/api/v1'
const swaggerUI = swaggerui

app.use(express.json())
app.use(cors())

app.use(
    API_VERSION + '/metamorphic-tests/docs',
    swaggerUI.serve,
    swaggerUI.setup(swaggerDocs, { explorer: true })
)
app.use(API_VERSION + '/metamorphic-tests', metamorphicTesting)

module.exports = app
