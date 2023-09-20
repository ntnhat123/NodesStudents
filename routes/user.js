import express from 'express'
import { body,validationResult } from 'express-validator'
import {
    userController
} from '../controllers/index.js'
const router = express.Router()

router.get('/',(req,res)=>{
    res.send('GET user')
})

router.get('/:id', userController.getDetailUser)

router.post(
  '/login',
  body('email').isEmail(),
  body('password').isLength({ min: 5 })
  ,userController.login
)

router.post('/update-user-info',userController.updateUserInfo)
router.get('/get-email',userController.getEmail)

router.post('/register',userController.register)

export default router