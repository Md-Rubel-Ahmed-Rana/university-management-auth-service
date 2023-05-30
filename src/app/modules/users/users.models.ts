import { Model, Schema, model } from 'mongoose'
import { UserInterface } from './users.interfaces'

type UserModel = Model<UserInterface, object>

const userSchema = new Schema<UserInterface>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

export const User = model<UserInterface, UserModel>('User', userSchema)
