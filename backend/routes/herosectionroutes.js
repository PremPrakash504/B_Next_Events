import express from "express";
import { isAdmin } from "../middlewares/login.js";
import { authorizesRoles } from "../middlewares/isAuth.js";
import {
  getHeroSection,
  updateHeroSection,
} from "../controller/herosection.controller.js";
import { uploadhero } from "../utils/multerHandler.js";

const herosectionrouter = express.Router();

herosectionrouter.put(
  "/updateHeroSection",
  isAdmin,
  authorizesRoles("admin"),
  uploadhero.single("background_image"),
  updateHeroSection,
);
herosectionrouter.get("/getHeroSection", getHeroSection);
export default herosectionrouter;
