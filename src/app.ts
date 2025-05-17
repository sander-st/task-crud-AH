import express from "express";
import morgan from "morgan";
import { taskRouter } from "./lib/task/infrastructure/express-routes.js";
import { userRouter } from "./lib/user/infrastructure/express-routes.js";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use("/api/user", userRouter);
app.use("/api/:userId/task", taskRouter);

app.listen(3000, () =>
  console.log("Server running on port http://localhost:3000")
);
