import config from '../../../config/index'
import ApiError from '../../../errors/ApiError'
import { User } from './user.models'
import { generateUserId } from './user.utils'
import { UserInterface } from './usersinterfaces'

const createUser = async (
  user: UserInterface
): Promise<UserInterface | null> => {
  const id = await generateUserId()
  user.id = id
  if (!user.password) {
    user.password = config.default_user_password as string
  }
  const createdUser = await User.create(user)
  if (!createdUser) {
    throw new ApiError(400, 'Failed to create user!')
  }
  return createdUser
}

export const UserService = {
  createUser,
}
