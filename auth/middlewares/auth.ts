import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "../src/errors/NotFoundError";


const authMiddleWare = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
  if (!req.currentUSer) {
    throw new NotFoundError
  }

  next()
}