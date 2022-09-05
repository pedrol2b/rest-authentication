import { Router } from 'express'
import SignupController from './controllers/SignupController'

const signupController = new SignupController()

import multer from './services/multer/multer'

import cdnUpload from './utils/cdnUpload'

const router = Router()

router.post('/signup', multer.single('avatar'), cdnUpload, signupController.handle)

export default router
