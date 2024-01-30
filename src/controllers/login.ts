import express, { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const foundUser = await User.findOne({ username }).exec();

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

    const passwordMatch = await bcrypt.compare(password, foundUser.password);
    if (!passwordMatch) {
      return res.status(400).json({
        status: "error",
        statusCode: 400,
        message: "Invalid credentials",
      });
    }

    const accessToken = jwt.sign(
      {
        UserInfo: {
          _id: foundUser._id,
          email: foundUser.username,
        },
      },
      `${process.env.ACCESS_TOKEN_SECRET}`,
      { expiresIn: "1d" }
    );

    const refreshToken = jwt.sign(
      {
        UserInfo: {
          _id: foundUser._id,
          username: foundUser.username,
        },
      },
      `${process.env.ACCESS_TOKEN_SECRET}`,
      { expiresIn: "5d" }
    );

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
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      statusCode: 500,
      error: error,
      message: "server error",
    });
  }
};

export { login };
