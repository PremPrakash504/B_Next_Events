import express from "express";
import { addbook, deleteBooking, getAllBookings, updateBooking } from "../controller/site.controller.js";
import { isAdmin } from "../middlewares/login.js";
import { authorizesRoles } from "../middlewares/isAuth.js";


const siterouter = express.Router();


siterouter.post("/addbook", addbook);
siterouter.get("/getallbooking",isAdmin,authorizesRoles("admin"), getAllBookings);
siterouter.patch("/updatebooking/:id",isAdmin,authorizesRoles("admin"),updateBooking);
siterouter.delete("/deletebooking/:id",isAdmin,authorizesRoles("admin"),deleteBooking);

export default siterouter;
