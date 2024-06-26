import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

import AppError from "../errors/app.errors";

const handleErrorMiddleware = (
  error: Error,
  _: Request,
  res: Response,
  __: NextFunction
): Response => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  if (error instanceof ZodError) {
    return res.status(400).json({ message: error.flatten().fieldErrors });
  }

  return res.status(500).json({ message: error.message });
};

export default handleErrorMiddleware;
