import { Request, Response } from 'express'
import userModel, { UserModel } from '../models/userModel'
import JWT from '../services/jwt/index'
const { jwtSign } = new JWT()
import { compare } from 'bcryptjs'

class SigninController {
  async handle(req: Request, res: Response): Promise<any> {
    const { username, email, password } = req.body

    try {
      const login = username ? { username } : { email }

      const User: UserModel | null = await userModel.findOne(login).select('+password')

      if (!User) return res.status(400).send({ error: true, message: 'Could not find user' })

      if (!(await compare(<string>password, <string>User.password)))
        return res.status(400).send({ error: true, message: 'Mismatched password' })

      User.password = undefined

      res.send({
        token: jwtSign({ _id: User._id }),
      })
    } catch (e) {
      res.status(500).send({ error: true, message: 'Internal Server Error' })
    }
  }
}

export default SigninController
