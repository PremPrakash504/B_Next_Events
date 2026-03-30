import express from "express";
import dotenv from "dotenv";
dotenv.config();

import db from "./config/db.connect.js";
import cookieParser from "cookie-parser";
import authrouter from "./routes/authroutes.js";
import siterouter from "./routes/siteroutes.js";
import portfoliorouter from "./routes/portfolioroutes.js";
import clientssayrouter from "./routes/clientssayroutes.js";
import herosectionrouter from "./routes/herosectionroutes.js";

import { multerErrorHandler } from "./utils/multerHandler.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authrouter);
app.use("/api/site",siterouter);
app.use("/api/portfolio",portfoliorouter);
app.use("/api/clientssay",clientssayrouter);
app.use("/api/herosection",herosectionrouter);
app.use(multerErrorHandler);
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await db.execute("SELECT 1");
    console.log("MySQL connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log("MySQL connection failed", error.message);
  }
};

startServer();
