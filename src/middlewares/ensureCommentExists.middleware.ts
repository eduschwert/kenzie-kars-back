import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import { z } from "zod";

import AppDataSource from "../data-source";
import AppError from "../errors/app.errors";
import { Comment } from "../entities";

const ensureCommentExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const commentRepository: Repository<Comment> =
    AppDataSource.getRepository(Comment);

  const commentId: string = req.params.commentId;

  const schema = z.string().uuid();

  const validateId = schema.safeParse(commentId);
  if (!validateId.success) {
    throw new AppError("Invalid UUID", 400);
  }

  const findComment = await commentRepository.findOne({
    where: {
      id: commentId,
    },
    relations: {
      user: true,
    },
  });

  if (!findComment) {
    throw new AppError("Comment not found", 404);
  }

  res.locals.comment = findComment;

  return next();
};

export default ensureCommentExistsMiddleware;
