import { Response } from "express";
import User from "../models/User";
import { AuthRequest } from "../types/auth";
import Assessment from "../models/Assessment";

export const createAssessment = async (req: AuthRequest, res: Response) => {
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
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({
        status: "error",
        message: "User not found",
      });
    }

    try {
      const createdAssessment = await Assessment.create({
        fullName,
        description,
        quantity,
      });

      return res.status(201).send({
        status: "ok",
        message: "Assessment created!",
        createdAssessment,
      });
    } catch (error) {
      res.status(500).send({
        status: "error",
        message: "An error occured",
      });
      console.log(error);
    }
  } else {
    console.log("User is not logged in");
    return res.status(403).send({
      status: "error",
      message: "User is not logged in",
    });
  }
};
