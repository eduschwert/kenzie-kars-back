import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { Repository } from "typeorm";

import { Address } from "../../entities";
import {
  TUserRequest,
  TUserResponse,
  TUserUpdate,
} from "../../interfaces/user.interfaces";
import AppError from "../../errors/app.errors";
import { userSchemaResponseWithoutPassword } from "../../schemas/user.schema";

const updateUserService = async (
  userData: TUserUpdate,
  user: User
): Promise<TUserResponse> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const updatedUser = userRepository.create({
    ...user,
    ...userData,
  });

  await userRepository.save(updatedUser);

  return userSchemaResponseWithoutPassword.parse(updatedUser);
};

export default updateUserService;
