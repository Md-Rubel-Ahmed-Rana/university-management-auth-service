import { User } from './users.models'

export const findlastUser = async () => {
  const lastUser = await User.findOne({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean()
  return lastUser?.id
}

export const generateUserId = async () => {
  const currentId = (await findlastUser()) || (0).toString().padStart(5, '0')
  return currentId
}
