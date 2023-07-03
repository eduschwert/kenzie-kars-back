import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import AppError from "../../errors/app.errors";
import { isAfter } from "date-fns";

import { User } from "../../entities";

const resetUserPasswordService = async (
  password: string,
  tokenResetPassword: string
) => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: {
      tokenResetPassword: tokenResetPassword,
    },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (
    !user.tokenResetPassword ||
    !user.tokenResetPasswordExpiresAt ||
    isAfter(new Date(), user.tokenResetPasswordExpiresAt)
  ) {
    throw new AppError("Invalid or expired token", 400);
  }

  user.password = password;
  user.tokenResetPassword = null;
  user.tokenResetPasswordExpiresAt = null;

  await userRepository.save(user);
};

export default resetUserPasswordService;
