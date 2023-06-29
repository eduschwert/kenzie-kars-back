import { User, Vehicle } from "../entities";
import {
  iCommentRequest,
  iCommentResponse,
} from "../interfaces/comment.interface";
import { Request, Response } from "express";
import { createCommentService } from "../services/comments/createComment.service";
import { listCommentsService } from "../services/comments/listComment.service";
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
