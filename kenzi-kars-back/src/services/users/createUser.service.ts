import { INewUser, IUser } from "../../interfaces/user.interfaces";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { Repository } from "typeorm";
import { returnUserSchemaNoPassword } from "../../schemas/user.schema";
import { Address } from "../../entities";

export const createUserService = async (userData: IUser): Promise<INewUser> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const adressRepository: Repository<Address> =
    AppDataSource.getRepository(Address);

  const newAdress = adressRepository.create(userData.address);

  await adressRepository.save(newAdress);

  const newUser = userRepository.create({ ...userData, address: newAdress });

  await userRepository.save(newUser);

  return returnUserSchemaNoPassword.parse(newUser);
};
