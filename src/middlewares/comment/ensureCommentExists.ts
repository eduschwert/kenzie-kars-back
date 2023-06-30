import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import AppError from "../../errors/app.errors";
import { Comment } from "../../entities";

export const ensureCommentExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const commentRepository: Repository<Comment> =
    AppDataSource.getRepository(Comment);

  const userId = res.locals.userId;

  const findComment = await commentRepository.findOne({
    where: {
      id: req.params.commentId,
    },
    relations: {
      owner: true,
    },
  });

  if (!findComment) {
    throw new AppError("Comment not found", 404);
  }

  if (findComment.owner.id !== userId) {
    throw new AppError("Invalid credentials", 401);
  }

  return next();
};
