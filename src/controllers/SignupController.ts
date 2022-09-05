import { Request, Response } from 'express'

class SignupController {
  constructor() {}

  async handle(req: Request, res: Response) {
    // !
    console.log(req)
    res.send()
  }
}

export default SignupController
