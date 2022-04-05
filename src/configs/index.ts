import dotenv from "dotenv";
import { JwtConfigs } from "./interfaces";

dotenv.config();

export const jwtConfigs: JwtConfigs = {
  secretKey: process.env.SECRET_KEY,
  expiresIn: process.env.TOKEN_EXPIRES || "1h",
};
