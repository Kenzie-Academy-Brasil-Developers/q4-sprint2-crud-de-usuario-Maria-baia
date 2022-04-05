import { DeleteResult, UpdateResult } from "typeorm";
import { User } from "../../entities/User";

export interface UserInterface {
  uuid: string;
  name: string;
  email: string;
  isAdm: boolean;
  password: string;
  createOn: Date;
  updateOn: Date;
}

export interface UserUpdate {
  name?: string;
  email?: string;
  password?: string;
  updateOm?: Date;
}

export interface UserRepo {
  createUser: (user: UserInterface) => Promise<User>;
  retrieveUsers: () => Promise<User[]>;
  retrieveUserById: (uuid: string) => Promise<User | undefined>;
  retrieveUserByEmail: (email: string) => Promise<User | undefined>;
  updateUser: (uuid: string, data: UserUpdate) => Promise<UpdateResult>;
  deleteUser: (uuid: string) => Promise<DeleteResult>;
}
