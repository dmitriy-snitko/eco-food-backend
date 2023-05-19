import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import { IError } from 'types/index.js'
import categoriesRouter from './routes/api/category.js'
import productsRouter from './routes/api/product.js'
import authRouter from './routes/api/auth.js'
import reviewRouter from './routes/api/review.js'
import brandRouter from './routes/api/brand.js'
import countryRouter from './routes/api/country.js'
import formRouter from './routes/api/form.js'
import availabilityRouter from './routes/api/availability.js'
import deliveryRouter from './routes/api/delivery.js'
import swaggerUI from 'swagger-ui-express'
import swaggerDocument from './swagger/swaggerDocument.json' assert { type: 'json' }

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/auth', authRouter)
app.use('/api/categories', categoriesRouter)
app.use('/api/products', productsRouter)
app.use('/api/reviews', reviewRouter)
app.use('/api/brands', brandRouter)
app.use('/api/countrys', countryRouter)
app.use('/api/form', formRouter)
app.use('/api/availability', availabilityRouter)
app.use('/api/delivery', deliveryRouter)
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

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
