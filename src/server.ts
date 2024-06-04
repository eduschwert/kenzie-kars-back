import app from "./app";
import AppDataSource from "./data-source";

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected!");
    const PORT: number = Number(process.env.PORT) || 3000;
    const runningMsg: string = `Server is running on PORT ${PORT}`;
    app.listen(PORT, () => {
      console.log(runningMsg);
    });
  })
  .catch((err) => {
    console.error(err);
  });
