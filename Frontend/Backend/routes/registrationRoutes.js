import express from "express";
import { createRegistration , getAllRegistrations} from "../controller/registrationController.js";

const router = express.Router();

router.post("/", createRegistration);
router.get("/", getAllRegistrations);

export default router;