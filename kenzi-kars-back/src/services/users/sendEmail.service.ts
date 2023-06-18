import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import AppError from "../../errors/app.errors";
import { randomUUID } from "crypto";

export const sendEmailResetPassword = async (email: string) => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const findUser = await userRepository.find({
    where: {
      email: email,
    },
  });

  if (!findUser) {
    throw new AppError("User not found", 404);
  }

  const token = randomUUID();

  //   await userRepository.update({
  //     where: { email: email },
  //     data: { tokenResetPassword: token },
  //   });
};
