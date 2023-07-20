import { Repository } from "typeorm";

import AppDataSource from "../../data-source";
import { Address, User } from "../../entities";
import { AddressResponse, AddressUpdate } from "../../interfaces/";
import { addressSchemaResponse } from "../../schemas/address.schema";

const updateUserAddressService = async (
  addressData: AddressUpdate,
  user: User
): Promise<AddressResponse> => {
  const addressRepository: Repository<Address> =
    AppDataSource.getRepository(Address);

  const updatedAddress = addressRepository.create({
    ...user.address,
    ...addressData,
  });

  await addressRepository.save(updatedAddress);

  return addressSchemaResponse.parse(updatedAddress);
};

export default updateUserAddressService;
