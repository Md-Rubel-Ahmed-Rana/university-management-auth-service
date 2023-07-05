import { Schema, model } from 'mongoose';
import { UserInterface, UserModel } from './users.interfaces';

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
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
    },
    // faculty: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Faculty"
    // },
    // admin: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Admin"
    // },
  },
  {
    timestamps: true,
  }
);

export const User = model<UserInterface, UserModel>('User', userSchema);
