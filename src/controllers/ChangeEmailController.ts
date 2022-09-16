import { Request, Response } from 'express'
import userModel from '../models/userModel'
import sendConfirmationCode from '../services/mail/sendConfirmationCode'

class ChangeEmailController {
  async handle(req: Request, res: Response): Promise<any> {
    const { email } = req.body
    const { user_id } = req

    try {
      await userModel.findByIdAndUpdate(user_id, {
        $set: {
          email,
        },
      })

      sendConfirmationCode(user_id, email)
      res.send()
    } catch (e) {
      res.status(500).send({ error: true, message: 'Internal Server Error' })
    }
  }
}

export default ChangeEmailController
