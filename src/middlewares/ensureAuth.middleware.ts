import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { Repository } from "typeorm";

import AppDataSource from "../data-source";
import AppError from "../errors/app.errors";
import { User } from "../entities";

const ensureAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let token = req.headers.authorization;

  if (!token) {
    throw new AppError("Missing bearer token", 401);
  }

  token = token.split(" ")[1];

  let decoded: any;
  try {
    decoded = jwt.verify(token, process.env.SECRET_KEY!);
  } catch (error) {
    const errorMessage = (error as Error).message;
    throw new AppError(errorMessage, 401);
  }

  res.locals.userId = decoded.sub;

  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const findUser = await userRepository.findOne({
    where: {
      id: decoded.sub,
    },
  });

  if (!findUser) {
    throw new AppError("Invalid credentials", 401);
  }

  res.locals.user = findUser;

  return next();
};

export default ensureAuthMiddleware;
