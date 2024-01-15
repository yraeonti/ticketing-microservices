import express, {Request, Response} from 'express'
import {body, validationResult} from 'express-validator'
import { BadRequestError, RequestValidationError } from '../errors';
import { validationRequest } from '../errors/ValidationReqError';
import { User } from '../models';
import { Password } from '../services';
import jwt from 'jsonwebtoken'

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
async (req: Request, res: Response) => {
    const {email, password} = req.body;

    const existingUser = await User.findOne({email})

    if (!existingUser) {
        throw new BadRequestError("Invalid credentials")
    }

    const matchPassword = await Password.compare(existingUser.password, password)

    if (!matchPassword) {
        throw new BadRequestError("Invalid credentials")
    }

    const token = jwt.sign({
        id: existingUser._id,
        email: existingUser.email
    }, process.env.JWT_KEY!)

    req.session = {
        jwt: token
    }

    res.status(201).send(existingUser);
})

export {router as signInRouter}