import "reflect-metadata";
import { createConnection } from "typeorm";
import app from "./app";

createConnection()
  .then(() => {
    app.listen(3000, () => {
      console.log("Running at port 3000");
    });
  })
  .catch((e: any) => console.log(e));
