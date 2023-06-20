import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import AppError from "../../errors/app.errors";
import { randomUUID } from "crypto";
import { emailService } from "../../utils/sendEmail.utils";

export const sendEmailResetPassword = async (email: string) => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user = await userRepository.find({
    where: {
      email: email,
    },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const token = randomUUID();

  await userRepository.update({ email: email }, { tokenResetPassword: token });

  const resetPasswordTemplate = emailService.resetPasswordTemplate(
    user[0].name,
    email,
    token
  );

  await emailService.sendEmail(resetPasswordTemplate);
};
