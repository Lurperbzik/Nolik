import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const secretKey = process.env.JWTPRIVATEKEY || "defaultSecretKey";

export interface CustomRequest extends Request {
  user?: string;
  role?: string;
}

export const authenticate = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(403).json("Acces denied");
    }

    const decoded: any = jwt.verify(token, secretKey);
    req.user = decoded.userId;
    next();
  } catch (error) {
    res.status(400).json("Invalid token");
  }
};

export const verifyRole =
  (requiredRole: string) =>
  (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      const token = req.cookies.jwt;
      console.log("Token: ", token);

      if (!token) {
        return res.status(403).json("Acces denied");
      }
      const decoded: any = jwt.verify(token, secretKey);
      req.user = decoded.userId;
      req.role = decoded.userRole;

      if (req.role === requiredRole) {
        next();
      } else {
        return res.status(403).json("Acces denied");
      }
    } catch (error) {
      res.status(400).json("Invalid token");
    }
  };
