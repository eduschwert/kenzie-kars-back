import { AppDataSource } from "../../data-source";
import { Repository } from "typeorm";

import AppError from "../../errors/app.errors";
import { User } from "../../entities/user.entity";

const listUserService = async (userId: string): Promise<IGetUser> => {
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

  console.log(findUser[0]);
  return returnUserSchemaNoPassword.parse(findUser[0]);
};

export default listUserService;
