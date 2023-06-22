import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { Repository } from "typeorm";
import AppError from "../../errors/app.errors";
import { returnUserSchemaNoPassword } from "../../schemas/user.schema";
import { IGetUser, INewUser } from "../../interfaces/user.interfaces";

export const getUserService = async (userId: string): Promise<IGetUser> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const findUser = await userRepository.find({
    relations: {
      address: true,
    },
    where: {
      id: userId,
    },
  });

  if (!findUser) {
    throw new AppError("User not found", 404);
  }

  return returnUserSchemaNoPassword.parse(findUser[0]);
};
