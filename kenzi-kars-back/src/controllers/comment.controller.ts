import { Comment, User, Vehicle } from "../entities";
import {
  iCommentRequest,
  iCommentResponse,
} from "../interfaces/comment.interface";
import { Request, Response } from "express";
import { createCommentService } from "../services/comments/createComment.service";
import { listCommentsService } from "../services/comments/listComment.service";
import { updateCommentService } from "../services/comments/putComment.service";
import { deleteCommentService } from "../services/comments/deleteComment.service";
export const createCommentController = async (req: Request, res: Response) => {
  const commentData: iCommentRequest = req.body;
  const userId: User = res.locals.user;
  const vehicle: Vehicle = res.locals.vehicle;

  const newComment: iCommentResponse = await createCommentService(
    commentData,
    userId,
    vehicle
  );

  return res.status(201).json(newComment);
};

export const listCommentsController = async (req: Request, res: Response) => {
  const vehicle: Vehicle = res.locals.vehicle;

  const allComments = await listCommentsService(vehicle.id);

  return res.status(200).json(allComments);
};

export const putCommentController = async (req: Request, res: Response) => {
  const commentId: string = req.params.commentId;
  const commentData: iCommentRequest = req.body;

  const updatedComment = await updateCommentService(commentId, commentData);

  return res.status(200).json(updatedComment);
};

export const deleteCommentController = async (req: Request, res: Response) => {
  const commentId: string = req.params.commentId;

  await deleteCommentService(commentId);

  return res.status(204).json();
};
