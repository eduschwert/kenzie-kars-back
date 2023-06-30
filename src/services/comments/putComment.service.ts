import { AppDataSource } from "../../data-source";
import { Comment } from "../../entities/comments.entity";
import { Repository } from "typeorm";
import { iCommentRequest } from "../../interfaces/comment.interface";
import { commentSchemaResponse } from "../../schemas/comment.schema";

export const updateCommentService = async (
  commentId: string,
  commentData: iCommentRequest
): Promise<any> => {
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

  const updatedComment: Comment = commentRepository.create({
    ...findComment,
    ...commentData,
  });

  await commentRepository.save(updatedComment);

  const filteredComment = commentSchemaResponse.parse(updatedComment);
  return filteredComment;
};
