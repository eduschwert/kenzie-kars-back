import { Request, Response } from "express";

import createUserService from "../services/users/createUser.service";
import listUserVehiclesService from "../services/users/listUserVehicles.service";
import updateUserService from "../services/users/updateUser.service";
import deleteUserService from "../services/users/deleteUser.service";
import {
  TUserRequest,
  TUserResponse,
  TUserUpdate,
} from "../interfaces/user.interfaces";
import { userSchemaResponseWithoutPassword } from "../schemas/user.schema";
import { User } from "../entities";
import { TAddressUpdate } from "../interfaces/address.interface";
import updateUserAddressService from "../services/users/updateUserAddress.service";

export const createNewUserController = async (req: Request, res: Response) => {
  const userData: TUserRequest = req.body;

  const newUser: TUserResponse = await createUserService(userData);

  return res.status(201).json(newUser);
};

export const getUserController = async (req: Request, res: Response) => {
  const user: User = res.locals.user;

  const userParsed: TUserResponse =
    userSchemaResponseWithoutPassword.parse(user);

  return res.json(userParsed);
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

export const updateUserController = async (req: Request, res: Response) => {
  const userUpdateData: TUserUpdate = req.body;
  const user: User = res.locals.user;

  const updatedUser: TUserResponse = await updateUserService(
    userUpdateData,
    user
  );

  return res.status(200).json(updatedUser);
};

export const updateUserAdressController = async (
  req: Request,
  res: Response
) => {
  const addressUpdateData: TAddressUpdate = req.body;
  const user: User = res.locals.user;

  const updatedUser: TUserResponse = await updateUserAddressService(
    addressUpdateData,
    user
  );

  return res.status(200).json(updatedUser);
};

export const deleteUserController = async (req: Request, res: Response) => {
  const user: User = res.locals.user;

  await deleteUserService(user);

  return res.status(204).json();
};
