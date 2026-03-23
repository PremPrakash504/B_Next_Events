import express from "express";
import { loginAdmin, signout } from "../controller/auth.controller.js";

const authrouter = express.Router();

authrouter.post("/adminlogin", loginAdmin);
authrouter.post("/adminsignout", signout);


export default authrouter;