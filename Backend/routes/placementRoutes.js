import express from "express";
import { 
  addPlacement, 
  getPlacements, 
  deletePlacement, 
  updatePlacement 
} from "../controller/placementController.js";
import { uploadPlacement } from "../middleware/upload.js";

const router = express.Router();

router.post("/add", uploadPlacement, addPlacement);
router.get("/", getPlacements);
router.delete("/:id", deletePlacement);
router.put("/:id", uploadPlacement, updatePlacement); // PUT route

export default router;