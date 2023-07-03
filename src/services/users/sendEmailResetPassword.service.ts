import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { randomUUID } from "crypto";
import AppError from "../../errors/app.errors";
import { addMinutes } from "date-fns";

import { User } from "../../entities";
import { resetPasswordTemplate, sendEmail } from "../../utils/sendEmail.utils";

const sendEmailResetPasswordService = async (email: string) => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: {
      email: email,
    },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const token = randomUUID();

  user.tokenResetPassword = token;
  user.tokenResetPasswordExpiresAt = addMinutes(new Date(), 10);

  await userRepository.save(user);

  await sendEmail(resetPasswordTemplate(user.name, email, token));
};

export default sendEmailResetPasswordService;
