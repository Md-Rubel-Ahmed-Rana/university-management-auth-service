import { Model } from 'mongoose';

export type UserInterface = {
  id: string;
  role: string;
  password: string;
};

export type UserModel = Model<UserInterface, Record<string, unknown>>;
