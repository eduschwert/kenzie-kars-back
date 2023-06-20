import "express-async-errors";
import express, { Application } from "express";
import cors from "cors";
import { userRoutes } from "./routers/user.routes";
import handleErrorMiddleware from "./middlewares/handleErrors.middleware";
import vehiclesRoutes from "./routers/vehicles.routes";
import { loginRoutes } from "./routers/login.routes";

const app: Application = express();
app.use(cors());
app.use(express.json());

app.use("users", userRoutes);
app.use("login", loginRoutes);
app.use("vehicles", vehiclesRoutes);

app.use(handleErrorMiddleware);

export default app;
