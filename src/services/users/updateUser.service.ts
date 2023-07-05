import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { Repository } from "typeorm";

import { TUserResponse, TUserUpdate } from "../../interfaces/user.interfaces";
import { userSchemaResponseWithoutPassword } from "../../schemas/user.schema";

export const updateUserService = async (
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
