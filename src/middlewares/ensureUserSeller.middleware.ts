import { Request, Response, NextFunction } from "express";

import AppError from "../errors/app.errors";
import { User } from "../entities";

const ensureUserSellerMiddleware = (
  _: Request,
  res: Response,
  next: NextFunction
): void => {
  const user: User = res.locals.user;

  if (!user.isSeller) {
    throw new AppError("User is not a seller", 403);
  }

  return next();
};

export default ensureUserSellerMiddleware;
