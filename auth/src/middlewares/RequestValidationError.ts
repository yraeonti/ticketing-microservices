import  {ValidationError} from 'express-validator'
import { CustomError } from './CustomError'

export class RequestValidationError extends CustomError {
    statusCode = 400
    constructor(public errors: ValidationError[]) {
        super('Request vaidation error')
        

        Object.setPrototypeOf(this, RequestValidationError.prototype)
    }

     serializeError() {
      return this.errors.map(err => {
        if (err.type === 'field')
            return {message: err.msg, field: err.path}
        
        return {message: err.msg}
      })
    }
}