import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelper } from '../../../helpers/jwtHelper';
import { User } from '../users/user.models';
import { ILoginUser } from './auth.interface';

const loginUser = async (payload: ILoginUser) => {
  const { id, password } = payload;

  // create user instance
  const user = new User();
  const isUserExist = await user.isUserExist(id);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  const isPasswordMathed = await user.isPasswordMathed(
    password,
    isUserExist.password as string
  );
  if (!isPasswordMathed) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is not correct');
  }

  // create access & refresh token
  const jwtPayload = {
    id: isUserExist.id,
    role: isUserExist.role,
  };
  const accessToken = jwtHelper.createToken(
    jwtPayload,
    config.jwt.secret as Secret,
    '1d'
  );
  const refreshToken = jwtHelper.createToken(
    jwtPayload,
    config.jwt.secret as Secret,
    '365d'
  );

  return {
    id: isUserExist.id,
    role: isUserExist.role,
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string) => {
  // verify token
  const user = new User();
  let verifyToken = null;
  try {
    verifyToken = await jwtHelper.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid refresh token');
  }
  const { id } = verifyToken as { id: string; role: string };
  const isUserExist = await user.isUserExist(id);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  // create new access token
  const jwtPayload = {
    id: isUserExist.id,
    role: isUserExist.role,
  };
  const newAccessToken = jwtHelper.createToken(
    jwtPayload,
    config.jwt.secret as Secret,
    '1d'
  );
  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
  loginUser,
  refreshToken,
};
