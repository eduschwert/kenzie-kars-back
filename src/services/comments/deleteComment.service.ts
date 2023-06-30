import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";

import { Comment } from "../../entities";
import AppError from "../../errors/app.errors";

export const deleteCommentService = async (
  commentId: string
): Promise<void> => {
  const commentRepository: Repository<Comment> =
    AppDataSource.getRepository(Comment);

  const findComment = await commentRepository.findOne({
    where: {
      id: commentId,
    },
    relations: {
      owner: true,
      vehicle: true,
    },
  });

  if (!findComment) {
    throw new AppError("Comment not found", 404);
  }

  await commentRepository.remove(findComment);
};
