import { Response } from "express";
import { AuthRequest } from "../types/auth";
import Assessment from "../models/Assessment";

export const getAssessment = async (req: AuthRequest, res: Response) => {
  const { assessmentID } = req.params;
  try {
    const userId = req.userId;
    if (userId) {
      const assessment = await Assessment.findById(assessmentID);
      return res.status(200).send({ status: "ok", assessment });
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
