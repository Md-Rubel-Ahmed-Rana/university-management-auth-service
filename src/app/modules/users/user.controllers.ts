import { RequestHandler } from 'express';
import { UserService } from './user.services';

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const result = await UserService.createUser(req.body);
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const UserController = {
  createUser,
};
