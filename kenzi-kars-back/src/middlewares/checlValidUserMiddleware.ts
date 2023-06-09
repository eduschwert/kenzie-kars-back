import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entity";
import AppError from "../errors/app.errors";

export const checkValidUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const findUserEmail = await userRepository.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (findUserEmail) {
    throw new AppError("Email already exists", 409);
  }

  return next();
};
