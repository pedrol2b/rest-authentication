import * as dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import { router } from './routes'

const app = express()
app.enable('trust proxy')
app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.use(router)

app.listen(process.env.PORT || 3031)
