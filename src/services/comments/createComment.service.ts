import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { Repository } from "typeorm";
import { Comment, Vehicle } from "../../entities";
import {
  iCommentRequest,
  iCommentResponse,
} from "../../interfaces/comment.interface";
import AppError from "../../errors/app.errors";
import { commentSchemaResponse } from "../../schemas/comment.schema";

export const createCommentService = async (
  commentData: iCommentRequest,
  user: User,
  vehicle: Vehicle
): Promise<iCommentResponse> => {
  const commentRepository: Repository<Comment> =
    AppDataSource.getRepository(Comment);
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const commentOwner = await userRepository.findOneBy({
    id: user.id,
  });

  const vehicleRepository: Repository<Vehicle> =
    AppDataSource.getRepository(Vehicle);

  const vehicleComment = await vehicleRepository.findOneBy({
    id: vehicle.id,
  });
  if (commentOwner == undefined || vehicleComment == undefined) {
    throw new AppError("User or vehicle not found", 404);
  }
  const newComment = commentRepository.create([
    {
      content: commentData.content,
      owner: commentOwner,
      vehicle: vehicleComment,
    },
  ]);
  console.log(newComment);

  await commentRepository.save(newComment);
  const filteredComment = commentSchemaResponse.parse(newComment[0]);
  return filteredComment;
};
