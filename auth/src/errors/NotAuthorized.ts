import { CustomError } from "./CustomError";



class NotAuthorized extends CustomError {
    statusCode: number = 401

    constructor() {
        super('Not authorized')

        Object.setPrototypeOf(this, NotAuthorized.prototype)
    }

    serializeError(): { message: string; field?: string | undefined; }[] {
        return [{message: 'Not authorized'}]
    }
}