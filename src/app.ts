import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import { IError } from 'types/index.js'
import categoriesRouter from './routes/api/categories.js'
import productsRouter from './routes/api/products.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/categories', categoriesRouter)
app.use('/api/products', productsRouter)

app.use((req: Request, res: Response) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: 'Not found',
  })
})

app.use((err: IError, req: Request, res: Response, next: NextFunction) => {
  const { status = 500, message = 'Internal Server Error' } = err
  res.status(status).json({
    status: 'error',
    code: status,
    message,
  })
})

export default app
