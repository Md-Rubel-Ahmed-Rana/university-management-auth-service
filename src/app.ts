import express, { Application, Request, Response } from 'express'
import cors from 'cors'

const app: Application = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// base route
app.get('/', (req: Request, res: Response) => {
  res.send('University server is working fine!')
})
export default app
