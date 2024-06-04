import { Request, Response, NextFunction } from "express";

import { Comment } from "../entities";
import AppError from "../errors/app.errors";

const ensureCommentOwnerMiddleware = (
  _: Request,
  res: Response,
  next: NextFunction
): void => {
  const userId = res.locals.userId;
  const comment: Comment = res.locals.comment;

  if (comment.user.id !== userId) {
    throw new AppError("You are not the owner of this comment", 403);
  }

  return next();
};

export default ensureCommentOwnerMiddleware;
