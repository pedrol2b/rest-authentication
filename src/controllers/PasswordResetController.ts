import { Request, Response } from 'express'
import userModel, { UserModel } from '../models/userModel'

class PasswordResetController {
  async handle(req: Request, res: Response): Promise<any> {
    const { token, email, new_password } = req.body

    try {
      const User: UserModel | null = await userModel
        .findOne({ email })
        .select('+passwordResetToken passwordResetExpiresIn')

      if (!User) return res.status(400).send({ error: true, message: 'No account linked with that email address' })

      if (token !== User.passwordResetToken) return res.status(400).send({ error: true, message: 'Token mismatched' })

      const now = new Date()
      if (now > User.passwordResetExpiresIn) return res.status(400).send({ error: true, message: 'Expired token' })

      if (new_password.length < 4) return res.status(400).send({ error: true, message: 'This password is very weak' })

      User.password = new_password
      await User.save()
      res.send()
    } catch (e) {
      res.status(500).send({ error: true, message: 'Internal Server Error' })
    }
  }
}

export default PasswordResetController
