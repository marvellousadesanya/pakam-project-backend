import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

interface CustomRequest extends Request {
  user?: string;
  userId?: string;
}

const verifyJWT = (req: CustomRequest, res: Response, next: NextFunction) => {
  const authHeader: any =
    req.headers.authorization || req.headers.Authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.sendStatus(401);
    // res.send({ message: "No header found!" });
  }

  const token: string = authHeader.split(" ")[1];
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err: jwt.VerifyErrors | null, decoded: any) => {
      if (err) {
        console.log(err);
        return res
          .status(403)
          .send({ error: "Access token expired or invalid" });
      }

      req.user = decoded.UserInfo.username;
      req.userId = decoded.UserInfo._id;

      next();
    }
  );
};

export default verifyJWT;
