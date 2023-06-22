import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";

import { User } from "../../entities/user.entity";
import AppError from "../../errors/app.errors";

const ensureEmailUniqueMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  if (req.body.email) {
    const existingUser = await userRepository.findOne({
      where: {
        email: req.body.email,
      },
    });
    const userId = res.locals.userId;

    if (existingUser && existingUser.id !== userId) {
      throw new AppError("Email already exists", 409);
    }
  }

  return next();
};

export default ensureEmailUniqueMiddleware;
