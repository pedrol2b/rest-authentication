import { Request, Response } from 'express'
import userModel, { UserModel } from '../models/userModel'
import sendConfirmationCode from '../services/mail/sendConfirmationCode'

class GetConfirmationCodeController {
  async handle(req: Request, res: Response): Promise<any> {
    const { user_id } = req

    try {
      const User: UserModel | null = await userModel.findById(user_id)

      await sendConfirmationCode(user_id, User?.email)
      res.send()
    } catch (e) {
      res.status(500).send({ error: true, message: 'Internal Server Error' })
    }
  }
}

export default GetConfirmationCodeController
