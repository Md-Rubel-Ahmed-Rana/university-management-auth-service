import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import { jwtHelper } from '../../helpers/jwtHelper';

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(requiredRoles);
    try {
      // get token from headers authorization
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
      }
      let verifiedUser = null;
      try {
        verifiedUser = jwtHelper.verifyToken(
          token,
          config.jwt.refresh_secret as Secret
        );
      } catch (error) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Invalid refresh token');
      }
      try {
        verifiedUser = jwtHelper.verifyToken(
          token,
          config.jwt.secret as Secret
        );
      } catch (error) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Invalid token');
      }
      req.user = verifiedUser;

      // check guard
      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
      }
      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
