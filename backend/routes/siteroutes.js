import express from "express";
import { addbook } from "../controller/site.controller.js";
import { getPortfolio } from "../controller/portfolio.controller.js";

const siterouter = express.Router();
siterouter.post("/addbook", addbook);
siterouter.get("/getportfolios", getPortfolio);


export default siterouter;