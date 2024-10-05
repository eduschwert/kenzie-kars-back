import "express-async-errors";
import express, { Application } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";

import swaggerDocs from "./docs/swagger.json";
import middlewares from "./middlewares";
import {
  usersRoutes,
  loginRoutes,
  sellersRoutes,
  vehiclesRoutes,
  commentsRoutes,
} from "./routers";

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/users", usersRoutes);
app.use("/login", loginRoutes);
app.use("/vehicles", vehiclesRoutes);
app.use("/sellers", sellersRoutes);
app.use("/comments", commentsRoutes);

app.use(middlewares.handleErrorMiddleware);

export default app;
