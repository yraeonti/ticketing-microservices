import express, {Request, Response} from 'express'
import {body, validationResult} from 'express-validator'
import { RequestValidationError } from '../middlewares';
import { validationRequest } from '../middlewares/ValidationReqError';

const router = express.Router()

router.post('/api/users/signin', [
body('email')
.isEmail()
.withMessage('Provide valid Email'),
body('password')
.trim()
.notEmpty()
.withMessage('Please provide password')
],
validationRequest,
(req: Request, res: Response) => {
    res.send('hi there')
})

export {router as signInRouter}