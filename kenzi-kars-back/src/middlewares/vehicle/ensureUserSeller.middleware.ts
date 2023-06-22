import { Request, Response, NextFunction } from "express";
import AppError from "../../errors/app.errors";

const ensureUserSellerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const user = res.locals.user;

  if (!user.is_seller) {
    throw new AppError(
      "You don`t have permissions to perform this action",
      403
    );
  }

  return next();
};

export default ensureUserSellerMiddleware;
