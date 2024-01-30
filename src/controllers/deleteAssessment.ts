import { Response } from "express";
import { AuthRequest } from "../types/auth";
import Assessment from "../models/Assessment";

export const deleteAssessment = async (req: AuthRequest, res: Response) => {
  const { assessmentID } = req.params;

  try {
    const userId = req.userId;
    if (!userId) {
      return res
        .status(401)
        .send({ status: "error", message: "User is not signed in" });
    }

    const deletedAssessment = await Assessment.deleteOne({ _id: assessmentID });

    if (deletedAssessment.deletedCount === 1) {
      return res
        .status(200)
        .send({ status: "ok", message: "Assessment deleted successfully" });
    } else {
      return res
        .status(404)
        .send({ status: "error", message: "Assessment not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error", message: "An error occurred" });
  }
};
