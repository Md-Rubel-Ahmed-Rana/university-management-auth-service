import httpStatus from 'http-status';
import sendResponse from '../../../shared/SendResponse';
import catchAsync from '../../../shared/catchAsync';
import { UserService } from './user.services';

const createUser = catchAsync(async (req, res, next) => {
  const result = await UserService.createUser(req.body);
  next();
  res.status(200).json();
  const resData = {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully!',
    data: result,
  };
  sendResponse(res, resData);
});

export const UserController = {
  createUser,
};
