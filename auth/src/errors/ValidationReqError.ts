import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { RequestValidationError } from "./RequestValidationError";


export const validationRequest = (req: Request, res: Response, next: NextFunction) => {
     const errors = validationResult(req);
     if (!errors.isEmpty()){
        throw new RequestValidationError(errors.array());
     }
     next()
}