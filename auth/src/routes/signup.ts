import express, { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import { RequestValidationError, DatabaseConnectionError, BadRequestError } from '../middlewares'
import jwt from 'jsonwebtoken'
import { User } from '../models'
import { validationRequest } from '../middlewares/ValidationReqError'

const router = express.Router()

router.post('/api/users/signup', [
    body('email')
    .isEmail()
    .withMessage('Email must be valid'),
    body('password')
    .trim()
    .isLength({min: 6, max: 20})
    .withMessage('Password must be between 6 and 20 characters')
], 
validationRequest,
async (req: Request, res: Response) => {

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
       throw new BadRequestError('Email in use');
    }

    const newUser = User.build({ email, password});
    await newUser.save();

    const token = jwt.sign({
        id: newUser._id,
        email: newUser.email
    }, process.env.JWT_KEY!)

    req.session = {
        jwt: token
    }

    res.status(201).send(newUser);

    
})

export {router as signUpRouter}