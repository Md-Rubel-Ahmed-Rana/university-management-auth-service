import config from '../../../config/index';
import ApiError from '../../../errors/ApiError';
import { User } from './user.models';
import { generateFacultyId } from './user.utils';
import { UserInterface } from './users.interfaces';

const createUser = async (
  user: UserInterface
): Promise<UserInterface | null> => {
  // const semester: { code: string; year: string } = { code: '03', year: '2025' };
  const id = await generateFacultyId();
  user.id = id as string;
  if (!user.password) {
    user.password = config.default_user_password as string;
  }
  const createdUser = await User.create(user);
  if (!createdUser) {
    throw new ApiError(400, 'Failed to create user!');
  }
  return createdUser;
};

export const UserService = {
  createUser,
};
