import { INewUser, IUpdateUser } from "../../interfaces/user.interfaces";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { Repository } from "typeorm";
import { returnUserSchemaNoPassword } from "../../schemas/user.schema";
import { Address } from "../../entities";
import AppError from "../../errors/app.errors";
import { hashSync } from "bcryptjs";

export const updateUserService = async (
  userData: IUpdateUser,
  userId: string
): Promise<INewUser> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const adressRepository: Repository<Address> =
    AppDataSource.getRepository(Address);

  const oldAddress = await adressRepository.findOneBy({
    seller: { id: userId },
  });

  const findUSer: User | null = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  const mergeAddress = { ...oldAddress, ...userData.address };

  await adressRepository.save(mergeAddress);

  const mergedUser = { ...findUSer, ...userData };

  const updatedUser = userRepository.create({
    ...mergedUser,
    address: mergeAddress,
  });

  await userRepository.save(updatedUser);

  return returnUserSchemaNoPassword.parse(updatedUser);
};

export const resetPassword = async (
  password: string,
  tokenResetPassword: string
) => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user = await userRepository.find({
    where: {
      tokenResetPassword: tokenResetPassword,
    },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  await userRepository.update(
    { id: user[0].id },
    {
      password: hashSync(password, 10),
      tokenResetPassword: null,
    }
  );
};
