import { getRepository, Repository } from "typeorm";
import { User } from "../../entities/User";
import { UserInterface, UserRepo, UserUpdate } from "./interface";

class UserRepository implements UserRepo {
  private ormRepo: Repository<User>;
  constructor() {
    this.ormRepo = getRepository(User);
  }
  createUser = async (user: UserInterface) => await this.ormRepo.save(user);
  retrieveUsers = async () => await this.ormRepo.find();
  retrieveUserById = async (uuid: string) =>
    await this.ormRepo.findOne({ uuid });
  retrieveUserByEmail = async (email: string) =>
    await this.ormRepo.findOne({ email });
  updateUser = async (uuid: string, data: UserUpdate) =>
    await this.ormRepo.update({ uuid }, data);
  deleteUser = async (uuid: string) => await this.ormRepo.delete({ uuid });
}
export default UserRepository;
