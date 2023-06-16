import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { User } from "../entities";
import AppError from "../errors/app.errors";
import { AppDataSource } from "../data-source";

const ensureValidUserIdMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const findUserById: User | null = await userRepository.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!findUserById) {
    throw new AppError("User not fount", 404);
  }

  return next();
};

export default ensureValidUserIdMiddleware;
