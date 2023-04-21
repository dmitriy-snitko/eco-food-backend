import { Schema } from 'joi'
import { NextFunction, Request, Response } from 'express'
import { HttpError } from '../helpers/HttpError.js'

export const validateBody = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body)
    if (error) {
      next(HttpError(400, error.message))
    }
    next()
  }
}
