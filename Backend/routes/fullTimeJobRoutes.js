import express from "express";
import { createFullTimeJob, getAllFullTimeJobs } from "../controller/fullTimeJobController.js";

const router = express.Router();

router.post("/apply", createFullTimeJob);
router.get("/all", getAllFullTimeJobs);

export default router;