import { Request, Response } from 'express'
import userModel, { UserModel } from '../models/userModel'

class EmailVerificationController {
  async handle(req: Request, res: Response): Promise<any> {
    const { code } = req.body
    const { user_id } = req

    try {
      const User: UserModel | null = await userModel
        .findById(user_id)
        .select('+emailVerificationCode emailVerificationExpiresIn')

      if (!User) return res.status(400).send({ error: true, message: 'User not found' })

      if (code !== User.emailVerificationCode) return res.status(400).send({ error: true, message: 'Code mismatched' })

      const now = new Date()
      if (now > User.emailVerificationExpiresIn) return res.status(400).send({ error: true, message: 'Code expired' })

      User.emailActivationStatus = 'Active'
      await User.save()

      res.send()
    } catch (e) {
      console.error(e)

      res.status(500).send({ error: true, message: 'Internal Server Error' })
    }
  }
}

export default EmailVerificationController
