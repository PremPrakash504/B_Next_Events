import express from "express";
import {isAdmin} from "../middlewares/login.js"
import { authorizesRoles } from "../middlewares/isAuth.js";
import { addPortfolio, getPortfolio, updatePortfolio, deletePortfolio } from "../controller/portfolio.controller.js";
import { upload } from "../utils/multerHandler.js";

const portfoliorouter = express.Router();
portfoliorouter.post("/addportfolio", isAdmin, authorizesRoles("admin"),upload.array("image"), addPortfolio);
portfoliorouter.get("/getportfolio", getPortfolio);
portfoliorouter.put("/updateportfolio/:id",isAdmin,authorizesRoles("admin"),upload.array("image"),updatePortfolio);
portfoliorouter.delete("/deleteportfolio/:id", isAdmin, authorizesRoles("admin"), deletePortfolio);
export default portfoliorouter;  