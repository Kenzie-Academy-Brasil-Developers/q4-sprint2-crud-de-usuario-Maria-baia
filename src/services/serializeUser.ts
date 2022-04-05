import { User } from "../entities/User";

const serializeUser = (user: User) => {
  const { uuid, name, email, isAdm, createOn, updateOn } = user;
  const response = { uuid, name, email, isAdm, createOn, updateOn };

  return response;
};

export default serializeUser;
