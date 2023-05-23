import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'
import * as service from '../services/index.js'
import { HttpError, ctrlWrapper, sendSuccessRes } from '../helpers/index.js'
import { IRequest } from '../types/user.js'

const { SECRET_KEY } = process.env

if (!SECRET_KEY) {
  throw new Error('SECRET_KEY is not defined')
}

const register = async (req: Request, res: Response) => {
  const { email } = req.body
  const user = await service.findUserByEmail(email)
  if (user) {
    throw HttpError(409, `Email '${email}' already in use`)
  }
  const newUser = await service.createUser(req.body)
  const data = {
    id: newUser._id,
    email: newUser.email,
    name: newUser.name,
  }
  sendSuccessRes(res, data, 201, 'created', 'User successfully registered')
}

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body
  const user = await service.findUserByEmail(email)
  if (!user) {
    throw HttpError(401, 'Email or password invalid')
  }
  const passwordCompare = await bcrypt.compare(password, user.password)
  if (!passwordCompare) {
    throw HttpError(401, 'Email or password invalid')
  }
  const payload = {
    id: user._id,
  }
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' })
  await service.updateToken(user._id, token)
  const data = {
    name: user.name,
    email: user.email,
    token,
  }
  sendSuccessRes(res, data)
}

const getCurrent = async (req: IRequest, res: Response) => {
  if (!req.user) {
    throw HttpError(401)
  }
  const { _id: id, email, name } = req.user
  sendSuccessRes(res, { id, name, email })
}

const logout = async (req: IRequest, res: Response) => {
  if (!req.user) {
    throw HttpError(401)
  }
  const {_id: id} = req.user
  await service.updateToken(id, '')

  res.json({
    status: 'success',
    code: 200,
    message: 'Logout success'
  })
}

export default {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
}
