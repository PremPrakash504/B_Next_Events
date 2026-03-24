import express from "express";
import {isAdmin} from "../middlewares/login.js"
import { authorizesRoles } from "../middlewares/isAuth.js";
import { addPortfolio, getPortfolio } from "../controller/portfolio.controller.js";
import { upload } from "../utils/multerHandler.js";

const portfoliorouter = express.Router();
portfoliorouter.post("/addportfolio", isAdmin, authorizesRoles("admin"), upload.array("image"), addPortfolio);
portfoliorouter.get("/getportfolios", getPortfolio);
export default portfoliorouter;  