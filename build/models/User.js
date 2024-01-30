"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        default: null,
    },
    lastName: {
        type: String,
        default: null,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,
    },
});
exports.default = (0, mongoose_1.model)("User", userSchema);
//# sourceMappingURL=User.js.map