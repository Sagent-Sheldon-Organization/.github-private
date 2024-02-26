import "express-async-errors";
import express from "express";
import { AppDataSource } from "./datasource/database";
import errorHandler from "./middleware/errorHandler";
import userRoutes from "./routes/userRoutes";
import candidateRoutes from "./routes/candidateRoutes";
import adverseactionRoutes from "./routes/adverseactionRoutes";
import candidateReportRoutes from "./routes/candidateReportRoutes";
import dotenv from "dotenv";

dotenv.config();

const app = express();

AppDataSource.initialize()
  .then(() => {
    console.log("Connected to db");
    app.use(express.json());
    app.use(userRoutes);
    app.use(candidateRoutes);
    app.use(adverseactionRoutes);
    app.use(candidateReportRoutes);
    app.use(errorHandler);
    const port = process.env.APP_PORT || 8080;
    app.listen(port, () => {
      console.log("Running app on port: " + port);
    });
  })
  .catch((err) => {
    console.log("Unable to connect to db: " + err);
  });
