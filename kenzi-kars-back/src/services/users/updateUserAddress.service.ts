import { AppDataSource } from "../../data-source";
import { Repository } from "typeorm";

import { Address, User } from "../../entities";
import { TAddressRequest } from "../../interfaces/address.interface";
import { userSchemaResponseWithoutPassword } from "../../schemas/user.schema";
import { TUserResponse } from "../../interfaces/user.interfaces";

const updateUserAddressService = async (
  addressData: TAddressRequest,
  user: User
): Promise<TUserResponse> => {
  const addressRepository: Repository<Address> =
    AppDataSource.getRepository(Address);

  const updatedAddress = addressRepository.create({
    ...user.address,
    ...addressData,
  });

  await addressRepository.save(updatedAddress);

  return userSchemaResponseWithoutPassword.parse({
    ...user,
    address: updatedAddress,
  });
};

export default updateUserAddressService;
