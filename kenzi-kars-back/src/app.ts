import "express-async-errors";
import express, { Application } from "express";
import handleErrorMiddleware from "./middlewares/handleErrors.middleware";
// import loginRoute from "./routers/login.routes";
// import clientRoutes from "./routers/clients.routes";
// import contactsRoutes from "./routers/contacts.routes";

const app: Application = express();
app.use(cors());
app.use(express.json());

// app.use("/login", loginRoute);

app.use(handleErrorMiddleware);

export default app;
function cors(): any {
  throw new Error("Function not implemented.");
}
