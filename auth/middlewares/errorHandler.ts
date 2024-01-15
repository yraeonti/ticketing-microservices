import {Request, Response, NextFunction} from 'express'
import { CustomError } from '../src/errors/CustomError'

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {

    if (err instanceof CustomError) {
        console.log('error');
        return res.status(err.statusCode).send({errors: err.serializeError()})
    }
    console.log(err);
    res.status(500).send({errors: [{message: 'Something went wrong...'}]})

}