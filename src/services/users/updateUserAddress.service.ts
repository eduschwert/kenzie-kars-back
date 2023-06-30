import { AppDataSource } from "../../data-source";
import { Repository } from "typeorm";

import { Address, User } from "../../entities";
import { TAddressUpdate } from "../../interfaces/address.interface";
import { userSchemaResponseWithoutPassword } from "../../schemas/user.schema";
import { TUserResponse } from "../../interfaces/user.interfaces";

const updateUserAddressService = async (
  addressData: TAddressUpdate,
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
