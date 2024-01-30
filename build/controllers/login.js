"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const foundUser = await User_1.default.findOne({ username }).exec();
        if (!foundUser) {
            return res.status(400).json({
                statusCode: 400,
                message: "User does not exist",
            });
        }
        if (!username || !password) {
            return res.status(400).json({
                statusCode: 400,
                message: "Username and password are required",
            });
        }
        const passwordMatch = await bcrypt_1.default.compare(password, foundUser.password);
        if (!passwordMatch) {
            return res.status(400).json({
                status: "error",
                statusCode: 400,
                message: "Invalid credentials",
            });
        }
        const accessToken = jsonwebtoken_1.default.sign({
            UserInfo: {
                _id: foundUser._id,
                email: foundUser.username,
            },
        }, `${process.env.ACCESS_TOKEN_SECRET}`, { expiresIn: "1d" });
        const refreshToken = jsonwebtoken_1.default.sign({
            UserInfo: {
                _id: foundUser._id,
                email: foundUser.username,
            },
        }, `${process.env.ACCESS_TOKEN_SECRET}`, { expiresIn: "5d" });
        foundUser.refreshToken = refreshToken;
        await foundUser.save();
        // res.cookie("refreshToken", refreshToken, { httpOnly: true });
        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            //   sameSite: "None",
            //   secure: true,
            maxAge: 24 * 60 * 60 * 1000,
        });
        return res.status(200).json({
            status: "ok",
            statusCode: 200,
            message: "User logged in successfully",
            user: foundUser,
            token: accessToken,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "error",
            statusCode: 500,
            error: error,
            message: "server error",
        });
    }
};
exports.login = login;
//# sourceMappingURL=login.js.map