"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const register_1 = require("../controllers/register");
const login_1 = require("../controllers/login");
const router = express_1.default.Router();
router.post("/", register_1.registerUser);
router.post("/", login_1.login);
exports.default = router;
//# sourceMappingURL=account.js.map