import "express-async-errors";
import express, { Application } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./docs/swagger.json";

import handleErrorMiddleware from "./middlewares/global/handleErrors.middleware";
import vehiclesRoutes from "./routers/vehicles.routes";
import userRoutes from "./routers/user.routes";
import loginRoutes from "./routers/login.routes";
import commentRoutes from "./routers/comments.routes";

const app: Application = express();
app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/users", userRoutes);
app.use("/login", loginRoutes);
app.use("/vehicles", vehiclesRoutes);
app.use("/comments", commentRoutes);

app.use(handleErrorMiddleware);

export default app;
