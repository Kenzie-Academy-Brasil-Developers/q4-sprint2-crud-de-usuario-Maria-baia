import * as yup from "yup";
import { v4 } from "uuid";
import bcrypt from "bcrypt";

const create = yup.object().shape({
  uuid: yup.string().default(() => v4()),
  name: yup.string().required(),
  email: yup.string().email().required(),
  createOn: yup.date().default(() => new Date()),
  updateOn: yup.date().default(() => new Date()),
  isAdm: yup.boolean().required(),
  password: yup
    .string()
    .min(4)
    .required()
    .transform((str) => bcrypt.hashSync(str, 10)),
});
export default create;
