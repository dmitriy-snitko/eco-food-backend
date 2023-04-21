import Joi from 'joi'
import { Schema, model } from 'mongoose'
import { handleMongooseError } from '../middleware/index.js'
import { IUser } from '../types/index.js'

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: emailRegexp,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: true,
    },
    token: {
      type: String,
      default: '',
    },
  },
  { versionKey: false, timestamps: true },
)

userSchema.post('save', handleMongooseError)

const registerSchema = Joi.object<IUser>({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
})

const loginSchema = Joi.object<IUser>({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
})

export const schemas = {
  registerSchema,
  loginSchema,
}

export const User = model<IUser>('user', userSchema)
