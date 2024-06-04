import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

import AppDataSource from "../data-source";
import AppError from "../errors/app.errors";
import { User } from "../entities";
import { LoginRequest } from "../interfaces";

const login = async (loginData: LoginRequest): Promise<string> => {
  const userRepository = AppDataSource.getRepository(User);

  const user: User | null = await userRepository.findOne({
    where: {
      email: loginData.email,
    },
  });

  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const comparedPassword = await compare(loginData.password, user.password);

  if (!comparedPassword) {
    throw new AppError("Invalid credentials", 401);
  }

  const newToken: string = jwt.sign({}, process.env.SECRET_KEY!, {
    expiresIn: process.env.EXPIRES_IN || "24h",
    subject: user.id,
  });

  return newToken;
};

export default login;
