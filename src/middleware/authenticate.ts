import jwt, { JwtPayload } from 'jsonwebtoken'
import { findUserById } from '../services/auth.js'
import { NextFunction, Request, Response } from 'express'
import { HttpError } from '../helpers/HttpError.js'
import { IRequest } from '../types/user.js'
import * as dotenv from 'dotenv'
dotenv.config()

const { SECRET_KEY } = process.env

if (!SECRET_KEY) {
  throw new Error('SECRET_KEY is not defined')
}

export const authenticate = async (req: IRequest, res: Response, next: NextFunction) => {
  const { authorization = '' } = req.headers
  const [bearer, token] = authorization.split(' ')

  if (bearer !== 'Bearer') {
    next(HttpError(401))
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY) as JwtPayload
    const user = await findUserById(id)

    if (!user || !user.token || user.token !== token) {
      return next(HttpError(401))
    }

    req.user = user
    next()
  } catch {
    next(HttpError(401))
  }
}
