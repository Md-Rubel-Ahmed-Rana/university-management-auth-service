import { Router } from 'express'
import { createUser } from './users.controllers'

const userRouter = Router()

userRouter.post('/create-user', createUser)

export default userRouter
