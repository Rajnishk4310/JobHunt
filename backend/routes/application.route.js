import express from "express";
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controllers/application.controller.js";
import isAuthenticated from "../auth/isAuthenticated.js";
const router = express.Router();

router.route("/apply/:id").get( applyJob);
router.route("/get").get( getAppliedJobs);
router.route("/:id/applicants").get( getApplicants);
router.route("/status/:id/update").post(isAuthenticated, updateStatus);

export default router;