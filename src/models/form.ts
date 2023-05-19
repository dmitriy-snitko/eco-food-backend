import { Schema, model } from 'mongoose'
import { IForm } from 'types/index.js'

const formSchema = new Schema<IForm>(
  {
    name: {
      type: String,
      enum: ['prepackaged', 'on weight'],
      default: 'on weight',
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
)

export const Form = model<IForm>('form', formSchema)
