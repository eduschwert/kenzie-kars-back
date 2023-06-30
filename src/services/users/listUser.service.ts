import { AppDataSource } from "../../data-source";
import { Repository } from "typeorm";

import AppError from "../../errors/app.errors";
import { User } from "../../entities/user.entity";
import { userSchemaResponseWithoutPassword } from "../../schemas/user.schema";
import { TUserResponse } from "../../interfaces/user.interfaces";

const listUserService = async (userId: string): Promise<TUserResponse> => {
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

  return userSchemaResponseWithoutPassword.parse(findUser[0]);
};

export default listUserService;
