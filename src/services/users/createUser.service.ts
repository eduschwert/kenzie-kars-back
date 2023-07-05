import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { Repository } from "typeorm";
import { Address } from "../../entities";
import { TUserRequest, TUserResponse } from "../../interfaces/user.interfaces";
import { userSchemaResponseWithoutPassword } from "../../schemas/user.schema";

const createUserService = async (
  userData: TUserRequest
): Promise<TUserResponse> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const adressRepository: Repository<Address> =
    AppDataSource.getRepository(Address);

  const newAdress = adressRepository.create(userData.address);
  await adressRepository.save(newAdress);

  const newUser = userRepository.create({ ...userData, address: newAdress });
  await userRepository.save(newUser);

  return userSchemaResponseWithoutPassword.parse(newUser);
};

export default createUserService;
