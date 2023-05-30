import { Request, Response } from 'express'
import { User } from './users.models'

export const createUser = async (req: Request, res: Response) => {
  try {
    const result = await User.create(req.body)
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create user!',
    })
  }
}
