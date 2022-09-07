import { Router } from 'express'
import SignupController from './controllers/SignupController'

const signupController = new SignupController()

import Multer from './middlewares/Multer'

import cdnUpload from './utils/cdnUpload'

const router = Router()

router.post('/signup', Multer.single('avatar'), cdnUpload, signupController.handle)

export default router
