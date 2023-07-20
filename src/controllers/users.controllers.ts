import { Request, Response } from "express";

import { userSchemaResponseWithoutPassword } from "../schemas/user.schema";
import { User } from "../entities";
import {
  AddressResponse,
  AddressUpdate,
  UserRequest,
  UserResponse,
  UserResponseWithoutAddress,
  UserUpdate,
} from "../interfaces/";
import resetUserPasswordService from "../services/users/resetUserPassword.service";
import createUserService from "../services/users/createUser.service";
import deleteUserService from "../services/users/deleteUser.service";
import sendEmailResetPasswordService from "../services/users/sendEmailResetPassword.service";
import updateUserService from "../services/users/updateUser.service";
import updateUserAddressService from "../services/users/updateUserAddress.service";

const createUserController = async (req: Request, res: Response) => {
  const userData: UserRequest = req.body;

  const newUser: UserResponse = await createUserService(userData);

  return res.status(201).json(newUser);
};

const getProfileUserController = async (_: Request, res: Response) => {
  const user: User = res.locals.user;

  return res.json(userSchemaResponseWithoutPassword.parse(user));
};

const updateUserController = async (req: Request, res: Response) => {
  const userUpdateData: UserUpdate = req.body;
  const user: User = res.locals.user;

  const updatedUser: UserResponseWithoutAddress = await updateUserService(
    userUpdateData,
    user
  );

  return res.status(200).json(updatedUser);
};

const updateUserAdressController = async (req: Request, res: Response) => {
  const addressUpdateData: AddressUpdate = req.body;
  const user: User = res.locals.user;

  const updatedAddress: AddressResponse = await updateUserAddressService(
    addressUpdateData,
    user
  );

  return res.status(200).json(updatedAddress);
};

const deleteUserController = async (_: Request, res: Response) => {
  const user: User = res.locals.user;

  await deleteUserService(user);

  return res.status(204).json();
};

const sendEmailPasswordResetController = async (
  req: Request,
  res: Response
) => {
  const { email } = req.body;

  await sendEmailResetPasswordService(email);

  return res.json({ message: "Link sent to email" });
};

const resetPasswordController = async (req: Request, res: Response) => {
  const { password } = req.body;

  const token = req.params.token;

  await resetUserPasswordService(password, token);

  return res.json({ message: "Password change with success" });
};

export {
  createUserController,
  getProfileUserController,
  updateUserController,
  updateUserAdressController,
  deleteUserController,
  sendEmailPasswordResetController,
  resetPasswordController,
};
