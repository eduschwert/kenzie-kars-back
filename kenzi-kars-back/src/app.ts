import "express-async-errors";
import express, { Application } from "express";
import cors from "cors";

import handleErrorMiddleware from "./middlewares/handleErrors.middleware";
import vehiclesRoutes from "./routers/vehicles.routes";

const app: Application = express();
app.use(cors());
app.use(express.json());

app.use("/vehicles", vehiclesRoutes);

app.use(handleErrorMiddleware);

export default app;
