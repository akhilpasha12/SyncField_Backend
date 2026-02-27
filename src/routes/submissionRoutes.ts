import express from "express";
import { upload } from "../middleware/upload";
import { createSubmission } from "../controllers/submissionController";

const router = express.Router();

// "images" must match frontend field name
router.post("/submission", upload.array("images", 5), createSubmission);

export default router;
