import "express-async-errors";
import express, { Application } from "express";
import handleErrorMiddleware from "./middlewares/handleErrors.middleware";
import cors from "cors";

import vehiclesRoutes from "./routers/vehicles.routes";

const app: Application = express();
app.use(cors());
app.use(express.json());

app.use("/vehicles", vehiclesRoutes);

app.use(handleErrorMiddleware);

export default app;
