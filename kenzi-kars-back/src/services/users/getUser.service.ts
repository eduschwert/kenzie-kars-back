import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { Repository } from "typeorm";
import AppError from "../../errors/app.errors";
import { returnUserSchemaNoPassword } from "../../schemas/user.schema";
import { INewUser } from "../../interfaces/user.interfaces";

export const getUserService = async (userId: string): Promise<INewUser> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const findUser = await userRepository.find({
    where: {
      id: userId,
    },
  });

  if (!findUser) {
    throw new AppError("User not found", 404);
  }
  console.log(findUser);
  return returnUserSchemaNoPassword.parse(findUser);
};
