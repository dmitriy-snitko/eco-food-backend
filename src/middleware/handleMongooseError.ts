import { IError } from '../types/index.js'

export const handleMongooseError = (error: IError, _: any, next: () => void) => {
  const { name, code } = error
  const status = name === 'MongoServerError' && code === 11000 ? 409 : 400
  error.status = status
  next()
}
