import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entity";
import AppError from "../errors/app.errors";

export const checkValidUserUpdateEmailMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const userId: string = res.locals.userId;

  if (req.body.email) {
    const findUserEmail = await userRepository.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (findUserEmail) {
      if (findUserEmail.id != userId) {
        throw new AppError("Email already exists", 409);
      }
    }
  }

  return next();
};
