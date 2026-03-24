import express from "express";
import {isAdmin} from "../middlewares/login.js"
import { getAllBookings, loginAdmin, signout, updateBooking, deleteBooking } from "../controller/auth.controller.js";
import { authorizesRoles } from "../middlewares/isAuth.js";
import { addPortfolio } from "../controller/portfolio.controller.js";
import { upload } from "../utils/multerHandler.js";

const authrouter = express.Router();

authrouter.post("/adminlogin", loginAdmin);
authrouter.post("/adminsignout", signout);
authrouter.get("/getallbooking",isAdmin,authorizesRoles("admin"), getAllBookings);
authrouter.patch("/updatebooking/:id",isAdmin,authorizesRoles("admin"),updateBooking);
authrouter.delete("/deletebooking/:id",isAdmin,authorizesRoles("admin"),deleteBooking);
authrouter.post("/addportfolio", isAdmin, authorizesRoles("admin"), upload.array("image"), addPortfolio);
export default authrouter;