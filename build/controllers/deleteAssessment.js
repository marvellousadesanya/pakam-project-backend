"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAssessment = void 0;
const Assessment_1 = __importDefault(require("../models/Assessment"));
const deleteAssessment = async (req, res) => {
    const { assessmentID } = req.params;
    try {
        const userId = req.userId;
        if (!userId) {
            return res
                .status(401)
                .send({ status: "error", message: "User is not signed in" });
        }
        const deletedAssessment = await Assessment_1.default.deleteOne({ _id: assessmentID });
        if (deletedAssessment.deletedCount === 1) {
            return res
                .status(200)
                .send({ status: "ok", message: "Assessment deleted successfully" });
        }
        else {
            return res
                .status(404)
                .send({ status: "error", message: "Assessment not found" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ status: "error", message: "An error occurred" });
    }
};
exports.deleteAssessment = deleteAssessment;
//# sourceMappingURL=deleteAssessment.js.map