import { AppDataSource } from "../../data-source";
import { Repository } from "typeorm";
import { Comment } from "../../entities";
import { iListComments } from "../../interfaces/comment.interface";
import { commentSchemaList } from "../../schemas/comment.schema";

export const listCommentsService = async (
  vehicleId: string
): Promise<iListComments> => {
  const commentRepository: Repository<Comment> =
    AppDataSource.getRepository(Comment);
  const findComments = await commentRepository.find({
    relations: {
      owner: true,
      vehicle: true,
    },
    where: {
      vehicle: { id: vehicleId },
    },
  });
  return commentSchemaList.parse(findComments);
};
