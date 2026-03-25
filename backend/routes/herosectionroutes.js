import express from "express";
import { isAdmin } from "../middlewares/login.js";
import { authorizesRoles } from "../middlewares/isAuth.js";
import {
  addHeroSection,
  deleteHeroSection,
  getHeroSection,
} from "../controller/herosection.controller.js";
import { uploadhero } from "../utils/multerHandler.js";

const herosectionrouter = express.Router();

herosectionrouter.post("/addHeroSection",
  isAdmin,
  authorizesRoles("admin"),
  uploadhero.single("background_image"),
  addHeroSection,
);
herosectionrouter.get("/getHeroSection", getHeroSection);
herosectionrouter.delete(
  "/deleteHeroSection",
  isAdmin,
  authorizesRoles("admin"),
  deleteHeroSection,
);
export default herosectionrouter;
