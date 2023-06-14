import { Request, Response } from "express";
import { IUser, INewUser, IGetUser } from "../interfaces/user.interfaces";
import { createUserService } from "../services/users/createUser.service";
import listUserVehiclesService from "../services/users/listUserVehicles.service";
import { getUserService } from "../services/users/getUser.service";

export const createNewUserController = async (req: Request, res: Response) => {
  const userData: IUser = req.body;

  const newUser: INewUser = await createUserService(userData);

  return res.status(201).json(newUser);
};

export const getUserController = async (req: Request, res: Response) => {
  const userId = res.locals.userId;
  const user: IGetUser = await getUserService(userId);
  return res.status(200).json(user);
};

export const getAllUserVehiclesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId = res.locals.userId;
  let perPage: number = 10;
  let page: number = 1;

  if (typeof req.query.perPage === "string") {
    const perPageQueryParam: string = req.query.perPage;
    const perPageValue: number = parseInt(perPageQueryParam, 10);
    if (!isNaN(perPageValue) && perPageValue >= 1 && perPageValue <= 10) {
      perPage = perPageValue;
    }
  }

  if (typeof req.query.page === "string") {
    const pageQueryParam: string = req.query.page;
    const pageValue: number = parseInt(pageQueryParam, 10);
    if (!isNaN(pageValue) && pageValue >= 1) {
      page = pageValue;
    }
  }

  const baseUrl: string = `${req.protocol}://${req.get("host")}${req.baseUrl}`;

  const allVehicles = await listUserVehiclesService(
    userId,
    perPage,
    page,
    baseUrl
  );

  return res.status(200).json(allVehicles);
};
