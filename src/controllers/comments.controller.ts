import { Request, Response } from "express";

import { User, Vehicle, Comment } from "../entities";
import { CommentRequest, CommentResponse } from "../interfaces";
import commentsService from "../services/comments.service";

const create = async (req: Request, res: Response) => {
  const commentData: CommentRequest = req.body;
  const user: User = res.locals.user;
  const vehicle: Vehicle = res.locals.vehicle;

  const newComment: CommentResponse = await commentsService.create(
    commentData,
    user,
    vehicle
  );

  return res.status(201).json(newComment);
};

const update = async (req: Request, res: Response) => {
  const commentData: CommentRequest = req.body;
  const comment: Comment = res.locals.comment;

  const updatedComment: CommentResponse = await commentsService.update(
    comment,
    commentData
  );

  return res.status(201).json(updatedComment);
};

const destroy = async (_: Request, res: Response) => {
  const comment: Comment = res.locals.comment;

  await commentsService.destroy(comment);

  return res.status(204).send();
};

export default { create, update, destroy };
