import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import { Error } from 'types/index.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use((req: Request, res: Response) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: 'Not found',
  })
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const { status = 500, message = 'Server error' } = err
  res.status(status).json({
    status: 'error',
    code: status,
    message,
  })
})

export default app
