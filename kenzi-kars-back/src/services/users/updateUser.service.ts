import { INewUser, IUpdateUser } from "../../interfaces/user.interfaces";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { Repository } from "typeorm";
import { returnUserSchemaNoPassword } from "../../schemas/user.schema";
import { Address } from "../../entities";

export const updateUserService = async (
  userData: IUpdateUser,
  userId: string
): Promise<INewUser> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const adressRepository: Repository<Address> =
    AppDataSource.getRepository(Address);

  console.log("USEERID UPDATE", userId);
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
  console.log(mergedUser);

  const updatedUser = userRepository.create({
    ...mergedUser,
    address: mergeAddress,
  });

  console.log("****************** MERGED ADDRESS", mergeAddress);

  await userRepository.save(updatedUser);

  return returnUserSchemaNoPassword.parse(updatedUser);
};
