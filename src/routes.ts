import { Router } from 'express'
import SignupController from './controllers/SignupController'
import SigninController from './controllers/SigninController'
import PasswordRecoveryController from './controllers/PasswordRecoveryController'
import PasswordResetController from './controllers/PasswordResetController'

const signupController = new SignupController()
const signinController = new SigninController()
const passwordRecoveryController = new PasswordRecoveryController()
const passwordResetController = new PasswordResetController()

import Multer from './middlewares/Multer'

const router = Router()

router.post('/signup', Multer.single('avatar'), signupController.handle)
router.post('/signin', signinController.handle)
router.post('/password_recovery', passwordRecoveryController.handle)
router.post('/password_reset', passwordResetController.handle)

export default router
