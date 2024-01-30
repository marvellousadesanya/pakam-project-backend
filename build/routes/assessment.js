"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const createAssessment_1 = require("../controllers/createAssessment");
const getAllAssessments_1 = require("../controllers/getAllAssessments");
const updateAssessment_1 = require("../controllers/updateAssessment");
const getAssessment_1 = require("../controllers/getAssessment");
const deleteAssessment_1 = require("../controllers/deleteAssessment");
const router = express_1.default.Router();
router.post("/", createAssessment_1.createAssessment);
router.get("/", getAllAssessments_1.getAllAssessments);
router.get("/assessment/:assessmentID", getAssessment_1.getAssessment);
router.put("/assessment/:assessmentID", updateAssessment_1.updateAssessment);
router.delete("/assessment/:assessmentID", deleteAssessment_1.deleteAssessment);
exports.default = router;
//# sourceMappingURL=assessment.js.map