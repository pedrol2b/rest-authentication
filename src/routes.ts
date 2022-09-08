import { Router } from 'express'
import SignupController from './controllers/SignupController'
import SigninController from './controllers/SigninController'

const signupController = new SignupController()
const signinController = new SigninController()

import Multer from './middlewares/Multer'

const router = Router()

router.post('/signup', Multer.single('avatar'), signupController.handle)
router.post('/signin', signinController.handle)

export default router
