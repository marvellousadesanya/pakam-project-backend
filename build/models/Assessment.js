"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const assessmentSchema = new mongoose_1.Schema({
    fullName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: null,
    },
    quantity: {
        type: Number,
        required: true,
    },
});
exports.default = (0, mongoose_1.model)("Assessment", assessmentSchema);
//# sourceMappingURL=Assessment.js.map