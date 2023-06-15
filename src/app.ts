import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import { UserRoutes } from './app/modules/users/user.route'

const app: Application = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// base route
app.get('/', async (req: Request, res: Response) => {
  res.send('<h1>University server is working fine!</h1>')
})

// Application routes
app.use('/api/v1/users/', UserRoutes)

// global error handler
app.use(globalErrorHandler)
export default app
