import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Address, User } from "../../entities";

const deleteUserService = async (userId: string): Promise<void> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const adressRepository: Repository<Address> =
    AppDataSource.getRepository(Address);

  const findUser: User | null = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  await userRepository.remove(findUser!);
};

export default deleteUserService;
