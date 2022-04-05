import * as yup from "yup";

const update = yup.object().shape({
  name: yup.string(),
  email: yup.string().email(),
  updateOn: yup.date().default(() => new Date()),
  password: yup.string().min(4),
});
export default update;
