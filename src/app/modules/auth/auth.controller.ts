import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import config from '../../../config';
import sendResponse from '../../../shared/SendResponse';
import catchAsync from '../../../shared/catchAsync';
import { AuthService } from './auth.service';

const loginUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { ...loginData } = req.body;
      const result = await AuthService.loginUser(loginData);
      const { refreshToken, ...others } = result;
      const cokieOptions = {
        secure: config.env === 'production',
        httpOnly: true,
      };
      res.cookie('refreshToken', refreshToken, cokieOptions);
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User logged in successfully!',
        data: others,
      });
    } catch (error) {
      next(error);
    }
  }
);

const refreshToken = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.cookies;
      const result = await AuthService.refreshToken(refreshToken);
      const cokieOptions = {
        secure: config.env === 'production',
        httpOnly: true,
      };
      res.cookie('refreshToken', refreshToken, cokieOptions);
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User logged in successfully!',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
);

export const AuthController = {
  loginUser,
  refreshToken,
};
