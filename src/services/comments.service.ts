import { Repository } from "typeorm";

import AppDataSource from "../data-source";
import { User, Vehicle, Comment } from "../entities";
import { CommentRequest, CommentResponse } from "../interfaces";
import { commentResponseSchema } from "../schemas";

const create = async (
  commentData: CommentRequest,
  user: User,
  vehicle: Vehicle
): Promise<CommentResponse> => {
  const commentRepository: Repository<Comment> =
    AppDataSource.getRepository(Comment);

  const newComment = commentRepository.create({
    content: commentData.content,
    user: user,
    vehicle: vehicle,
  });

  await commentRepository.save(newComment);

  return commentResponseSchema.parse(newComment);
};

const update = async (
  comment: Comment,
  commentData: CommentRequest
): Promise<CommentResponse> => {
  const commentRepository: Repository<Comment> =
    AppDataSource.getRepository(Comment);

  const updatedComment: Comment = commentRepository.create({
    ...comment,
    ...commentData,
  });

  await commentRepository.save(updatedComment);

  return commentResponseSchema.parse(updatedComment);
};

const destroy = async (comment: Comment): Promise<void> => {
  const commentRepository: Repository<Comment> =
    AppDataSource.getRepository(Comment);

  await commentRepository.remove(comment);
};

export default { create, update, destroy };
