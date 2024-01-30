"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAssessment = void 0;
const User_1 = __importDefault(require("../models/User"));
const Assessment_1 = __importDefault(require("../models/Assessment"));
const updateAssessment = async (req, res) => {
    const { fullName, description, quantity } = req.body;
    const { assessmentID } = req.params;
    const userId = req.userId;
    const assessment = await Assessment_1.default.findOne({ assessmentID });
    if (!fullName || !description || !quantity) {
        return res.status(500).send({
            status: "error",
            message: "Missing required fields, fullName, description, quantity",
        });
    }
    if (userId && assessment) {
        const user = await User_1.default.findById(userId);
        if (!user) {
            return res.status(404).send({
                status: "error",
                message: "User not found",
            });
        }
        try {
            if (fullName) {
                assessment.fullName = fullName;
            }
            if (quantity) {
                assessment.quantity = quantity;
            }
            if (description) {
                assessment.description = description;
            }
            await assessment.save();
            return res.status(201).send({
                status: "ok",
                message: "Assessment updated!",
                assessment,
            });
        }
        catch (error) {
            res.status(500).send({
                status: "error",
                message: "An error occured",
            });
            console.log(error);
        }
    }
    else {
        console.log("User is not logged in");
        return res.status(403).send({
            status: "error",
            message: "User is not logged in",
        });
    }
};
exports.updateAssessment = updateAssessment;
//# sourceMappingURL=updateAssessment.js.map