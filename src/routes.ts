import { Router } from 'express'
import SignupController from './controllers/SignupController'
import SigninController from './controllers/SigninController'
import PasswordRecoveryController from './controllers/PasswordRecoveryController'
import PasswordResetController from './controllers/PasswordResetController'
import ChangeEmailController from './controllers/ChangeEmailController'
import GetConfirmationCodeController from './controllers/GetConfirmationCodeController'

const signupController = new SignupController()
const signinController = new SigninController()
const passwordRecoveryController = new PasswordRecoveryController()
const passwordResetController = new PasswordResetController()
const changeEmailController = new ChangeEmailController()
const getConfirmationCodeController = new GetConfirmationCodeController()

import ensureAuthenticated from './middlewares/ensureAuthenticated'
import Multer from './middlewares/Multer'

const router = Router()

router.post('/signup', Multer.single('avatar'), signupController.handle)
router.post('/signin', signinController.handle)
router.post('/password_recovery', passwordRecoveryController.handle)
router.post('/password_reset', passwordResetController.handle)
router.post('/email_change', ensureAuthenticated, changeEmailController.handle)
router.get('/email_verify', ensureAuthenticated, getConfirmationCodeController.handle)

export default router
