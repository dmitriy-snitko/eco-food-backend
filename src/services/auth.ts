import bcrypt from 'bcrypt'
import { User } from '../models/user.js'
import { IUser } from '../types/index.js'
import { ObjectId } from 'mongoose'

export const findUserById = async (id: string) => {
  return await User.findById(id, '-createdAt -updatedAt')
}

export const findUserByEmail = async (email: string) => {
  return await User.findOne({ email }, '-createdAt -updatedAt')
}

export const createUser = async ({ name, email, password }: IUser) => {
  const hashPassword = await bcrypt.hash(password, 10)
  return await User.create({ name, email, password: hashPassword })
}

export const updateToken = async (id: ObjectId, token: string) => {
  return await User.findByIdAndUpdate(id, {token})
}