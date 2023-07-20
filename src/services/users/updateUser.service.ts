import { Repository } from "typeorm";

import AppDataSource from "../../data-source";
import { userSchemaResponseWithoutPasswordAndAddress } from "../../schemas/user.schema";
import { UserResponseWithoutAddress, UserUpdate } from "../../interfaces/";
import { User } from "../../entities";

const updateUserService = async (
  userData: UserUpdate,
  user: User
): Promise<UserResponseWithoutAddress> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const updatedUser = userRepository.create({
    ...user,
    ...userData,
  });

  await userRepository.save(updatedUser);

  return userSchemaResponseWithoutPasswordAndAddress.parse(updatedUser);
};

export default updateUserService;
