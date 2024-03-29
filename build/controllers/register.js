"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerUser = async (req, res) => {
    const { firstName, lastName, username, password } = req.body;
    if (!firstName || !lastName || !username || !password) {
        return res.status(400).json({
            status: "error",
            statusCode: 400,
            message: "Bad Request - Missing required field",
        });
    }
    const userExists = await User_1.default.findOne({ username });
    if (userExists) {
        return res.status(409).json({
            status: "error",
            statusCode: 409,
            message: "User already exists",
        });
    }
    try {
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const createdUser = await User_1.default.create({
            firstName,
            lastName,
            username,
            password: hashedPassword,
        });
        const token = jsonwebtoken_1.default.sign({ id: createdUser._id }, `${process.env.ACCESS_TOKEN_SECRET}`, {
            expiresIn: "1d",
        });
        return res.status(201).json({
            status: "ok",
            statusCode: 201,
            message: "User created successfully. Please check email for verification code",
            createdUser,
            token,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "error",
            statusCode: 500,
            message: "server error",
        });
    }
};
exports.registerUser = registerUser;
//# sourceMappingURL=register.js.map