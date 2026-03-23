import express from "express";
import { addEvent, getAllEvents, getEventById, updateEvent, deleteEvent } from "../controller/site.controller.js";
import { isAdmin } from "../middlewares/login.js";
import upload from "../middlewares/upload.js";

const eventRouter = express.Router();

eventRouter.get("/getallevents", getAllEvents);
eventRouter.get("/getevent/id/:id", getEventById);
eventRouter.post("/addevent", isAdmin, upload.single("image"), addEvent);
eventRouter.put("/updateevent/id/:id", isAdmin, upload.single("image"), updateEvent);
eventRouter.delete("/deleteevent/id/:id", isAdmin, deleteEvent);

export default eventRouter;
