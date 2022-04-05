import { UserInterface } from "../repositories/user/interface";
import { User } from "../entities/User";

declare global {
  namespace Express {
    interface Request {
      user: User;
      validated: UserInterface;
      uuid: string;
      email: string;
    }
  }
}
