import express, { Router } from "express";

import { createAssessment } from "../controllers/createAssessment";
import { getAllAssessments } from "../controllers/getAllAssessments";
import { updateAssessment } from "../controllers/updateAssessment";
import { getAssessment } from "../controllers/getAssessment";
import { deleteAssessment } from "../controllers/deleteAssessment";

const router: Router = express.Router();

router.post("/", createAssessment);
router.get("/", getAllAssessments);
router.get("/assessment/:assessmentID", getAssessment);
router.put("/assessment/:assessmentID", updateAssessment);
router.delete("/assessment/:assessmentID", deleteAssessment);

export default router;
