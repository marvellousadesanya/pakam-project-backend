"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAssessment = void 0;
const User_1 = __importDefault(require("../models/User"));
const Assessment_1 = __importDefault(require("../models/Assessment"));
const createAssessment = async (req, res) => {
    const { fullName, description, quantity } = req.body;
    const userId = req.userId;
    // const itemsToAdd = Array.isArray(items) ? items : [items];
    if (!fullName || !description || !quantity) {
        return res.status(500).send({
            status: "error",
            message: "Missing required fields, fullName, description, quantity",
        });
    }
    if (userId) {
        const user = await User_1.default.findById(userId);
        if (!user) {
            return res.status(404).send({
                status: "error",
                message: "User not found",
            });
        }
        try {
            const createdAssessment = await Assessment_1.default.create({
                fullName,
                description,
                quantity,
            });
            return res.status(201).send({
                status: "ok",
                message: "Assessment created!",
                createdAssessment,
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
exports.createAssessment = createAssessment;
//# sourceMappingURL=createAssessment.js.map