"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAssessment = void 0;
const Assessment_1 = __importDefault(require("../models/Assessment"));
const getAssessment = async (req, res) => {
    const { assessmentID } = req.params;
    try {
        const userId = req.userId;
        if (userId) {
            const assessment = await Assessment_1.default.findById(assessmentID);
            return res.status(200).send({ status: "ok", assessment });
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
exports.getAssessment = getAssessment;
//# sourceMappingURL=getAssessment.js.map