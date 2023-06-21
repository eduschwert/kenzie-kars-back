import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import AppError from "../../errors/app.errors";
import { AxiosError } from "axios";

const handleErrorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  _: NextFunction
): Response => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  if (error instanceof ZodError) {
    return res.status(400).json({ message: error.flatten().fieldErrors });
  }

  if (error instanceof AxiosError) {
    return res.status(400).json({
      message:
        "The specified car model is not available in the internal car database.",
    });
  }

  console.error(error);
  return res.status(500).json({ message: error.message });
};

export default handleErrorMiddleware;
