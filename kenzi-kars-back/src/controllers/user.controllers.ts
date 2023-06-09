import { Request, Response } from "express";
import { IUser, INewUser } from "../interfaces/user.interfaces";
import { createUserService } from "../services/users/createUser.service";

export const createNewUserController = async (req: Request, res: Response) => {
  const userData: IUser = req.body;

  const newUser: INewUser = await createUserService(userData);

  return res.status(201).json(newUser);
};
