import { Router } from 'express'
import SignupController from './controllers/SignupController'

const signupController = new SignupController()

import Multer from './middlewares/Multer'

const router = Router()

router.post('/signup', Multer.single('avatar'), signupController.handle)

export default router
