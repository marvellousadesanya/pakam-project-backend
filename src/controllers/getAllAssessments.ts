import { Response } from "express";
import { AuthRequest } from "../types/auth";
import Assessment from "../models/Assessment";

export const getAllAssessments = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    if (userId) {
      const allAssessments = await Assessment.find();
      return res
        .status(200)
        .send({ status: "ok", assessments: allAssessments });
    } else {
      return res
        .status(401)
        .send({ status: "error", message: "User is not signed in" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error", message: "An error occured" });
  }
};
