import { Request, Response } from "express";

import {
  UserRequest,
  UserUpdate,
  AddressRequest,
  AddressResponse,
  UserResponseWithoutPassword,
  UserResponseWithoutPasswordAndAddress,
  UserUpdatePassword,
} from "../interfaces";
import { usersServices } from "../services";
import { User } from "../entities";

const create = async (req: Request, res: Response) => {
  const userData: UserRequest = req.body;

  const newUser: UserResponseWithoutPassword = await usersServices.create(
    userData
  );

  return res.status(201).json(newUser);
};

const findOne = async (_: Request, res: Response) => {
  const user: User = res.locals.user;

  const userWithAddress: UserResponseWithoutPassword =
    await usersServices.findOne(user);

  return res.json(userWithAddress);
};

const update = async (req: Request, res: Response) => {
  const userUpdateData: UserUpdate = req.body;
  const user: User = res.locals.user;

  const updatedUser: UserResponseWithoutPasswordAndAddress =
    await usersServices.update(userUpdateData, user);

  return res.status(200).json(updatedUser);
};

const updatePassword = async (req: Request, res: Response) => {
  const userPasswordUpdateData: UserUpdatePassword = req.body;
  const user: User = res.locals.user;

  await usersServices.updatePassword(userPasswordUpdateData, user);

  return res.json({ message: "Password change with success" });
};

const updateAddress = async (req: Request, res: Response) => {
  const addressUpdateData: AddressRequest = req.body;
  const user: User = res.locals.user;

  const updatedAddress: AddressResponse = await usersServices.updateAddress(
    addressUpdateData,
    user
  );

  return res.status(200).json(updatedAddress);
};

const destroy = async (_: Request, res: Response) => {
  const user: User = res.locals.user;

  await usersServices.destroy(user);

  return res.status(204).json();
};

const sendEmailResetPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  await usersServices.sendEmailResetPassword(email);

  return res.json({ message: "Link sent to email" });
};

const resetPasswordController = async (req: Request, res: Response) => {
  const { password } = req.body;

  const token = req.params.token;

  await usersServices.resetPassword(password, token);

  return res.json({ message: "Password change with success" });
};

export default {
  create,
  findOne,
  update,
  updatePassword,
  updateAddress,
  destroy,
  sendEmailResetPassword,
  resetPasswordController,
};
