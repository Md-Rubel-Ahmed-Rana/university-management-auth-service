import config from '../../../../config/index'
import { UserInterface } from './users.interfaces'
import { User } from './users.models'
import { generateUserId } from './users.utils'

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
    throw new Error('Failed to create user!')
  }
  return createdUser
}

export default {
  createUser,
}
