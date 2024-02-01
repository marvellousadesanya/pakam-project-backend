import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req: Request, res: Response) => {
  const { firstName, lastName, username, password } = req.body;

  if (!firstName || !lastName || !username || !password) {
    return res.status(400).json({
      status: "error",
      statusCode: 400,
      message: "Bad Request - Missing required field",
    });
  }
  const userExists = await User.findOne({ username });

  if (userExists) {
    return res.status(409).json({
      status: "error",
      statusCode: 409,
      message: "User already exists",
    });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await User.create({
      firstName,
      lastName,
      username,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: createdUser._id },
      `${process.env.ACCESS_TOKEN_SECRET}`,
      {
        expiresIn: "1d",
      }
    );
    return res.status(201).json({
      status: "ok",
      statusCode: 201,
      message:
        "User created successfully. Please check email for verification code",
      createdUser,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      statusCode: 500,
      message: "server error",
    });
  }
};
