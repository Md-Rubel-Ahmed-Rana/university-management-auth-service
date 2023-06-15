import { Schema, model } from 'mongoose'
import { UserInterface, UserModel } from './usersinterfaces'

const userSchema = new Schema<UserInterface>(
  {
    id: {
      type: String,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

export const User = model<UserInterface, UserModel>('User', userSchema)
