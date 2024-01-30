"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllAssessments = void 0;
const Assessment_1 = __importDefault(require("../models/Assessment"));
const getAllAssessments = async (req, res) => {
    try {
        const userId = req.userId;
        if (userId) {
            const allAssessments = await Assessment_1.default.find();
            return res
                .status(200)
                .send({ status: "ok", assessments: allAssessments });
        }
        else {
            return res
                .status(401)
                .send({ status: "error", message: "User is not signed in" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ status: "error", message: "An error occured" });
    }
};
exports.getAllAssessments = getAllAssessments;
//# sourceMappingURL=getAllAssessments.js.map