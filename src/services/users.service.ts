import { Repository } from "typeorm";
import { randomUUID } from "crypto";
import { addMinutes } from "date-fns";
import { isAfter } from "date-fns";

import AppDataSource from "../data-source";
import { User, Address } from "../entities";
import {
  AddressResponse,
  AddressRequest,
  UserRequest,
  UserResponseWithoutPassword,
  UserResponseWithoutPasswordAndAddress,
  UserUpdate,
} from "../interfaces";
import {
  addressResponseSchema,
  userResponseSchemaWithoutPassword,
  userResponseSchemaWithoutPasswordAndAddress,
} from "../schemas";
import AppError from "../errors/app.errors";
import { sendEmail } from "../utils";

const create = async (
  userData: UserRequest
): Promise<UserResponseWithoutPassword> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const adressRepository: Repository<Address> =
    AppDataSource.getRepository(Address);

  const newAdress = adressRepository.create(userData.address);
  await adressRepository.save(newAdress);

  const newUser = userRepository.create({ ...userData, address: newAdress });
  await userRepository.save(newUser);

  return userResponseSchemaWithoutPassword.parse(newUser);
};

const findOne = async (user: User): Promise<UserResponseWithoutPassword> => {
  const addressRepository: Repository<Address> =
    AppDataSource.getRepository(Address);

  const findAddress = await addressRepository.findOne({
    where: {
      user: { id: user.id },
    },
  });

  return userResponseSchemaWithoutPassword.parse({
    ...user,
    address: findAddress,
  });
};

const update = async (
  userData: UserUpdate,
  user: User
): Promise<UserResponseWithoutPasswordAndAddress> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const updatedUser = userRepository.create({
    ...user,
    ...userData,
  });

  await userRepository.save(updatedUser);

  return userResponseSchemaWithoutPasswordAndAddress.parse(updatedUser);
};

const updateAddress = async (
  addressData: AddressRequest,
  user: User
): Promise<AddressResponse> => {
  const addressRepository: Repository<Address> =
    AppDataSource.getRepository(Address);

  const findAddress = await addressRepository.findOne({
    where: {
      user: { id: user.id },
    },
  });

  const updatedAddress = addressRepository.create({
    ...findAddress,
    ...addressData,
  });
  await addressRepository.save(updatedAddress);

  return addressResponseSchema.parse(updatedAddress);
};

const destroy = async (user: User): Promise<void> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  await userRepository.remove(user);
};

const resetPassword = async (
  password: string,
  tokenResetPassword: string
): Promise<void> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: {
      tokenResetPassword: tokenResetPassword,
    },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (
    !user.tokenResetPassword ||
    !user.tokenResetPasswordExpiresAt ||
    isAfter(new Date(), user.tokenResetPasswordExpiresAt)
  ) {
    throw new AppError("Invalid or expired token", 400);
  }

  user.password = password;
  user.tokenResetPassword = null;
  user.tokenResetPasswordExpiresAt = null;

  await userRepository.save(user);
};

const sendEmailResetPassword = async (email: string): Promise<void> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: {
      email: email,
    },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const token = randomUUID();

  user.tokenResetPassword = token;
  user.tokenResetPasswordExpiresAt = addMinutes(new Date(), 10);

  await userRepository.save(user);

  await sendEmail.sendEmail(
    sendEmail.resetPasswordTemplate(user.name, email, token)
  );
};

export default {
  create,
  findOne,
  destroy,
  resetPassword,
  sendEmailResetPassword,
  update,
  updateAddress,
};
