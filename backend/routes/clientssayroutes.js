import express from "express";
import { uploadSingle } from "../utils/multerHandler.js";
import { addClientReview, deleteReview, getAllReviewsByAdminBeforeApproval, getApprovedReviews, updateReviewStatus } from "../controller/clientssay.controller.js";
import { isAdmin } from "../middlewares/login.js";
import { authorizesRoles } from "../middlewares/isAuth.js";

const clientssayrouter = express.Router();

clientssayrouter.post(
  "/addreview",
  uploadSingle.single("image"),
  addClientReview
);
clientssayrouter.get("/getAllReviewsByAdminBeforeApproval", isAdmin, authorizesRoles("admin"), getAllReviewsByAdminBeforeApproval);

clientssayrouter.put(
  "/reviewstatus/:id",
  isAdmin,
  authorizesRoles("admin"),
  updateReviewStatus
);
clientssayrouter.get("/getApprovedReviews", getApprovedReviews);
clientssayrouter.delete(
  "/deletereview/:id",
  isAdmin,
  authorizesRoles("admin"),
  deleteReview
);
export default clientssayrouter;  