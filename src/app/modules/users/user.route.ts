import { Router } from 'express'
import { UserController } from './user.controllers'

const userRouter = Router()

userRouter.post('/create-user', UserController.createUser)

export const UserRoutes = userRouter
