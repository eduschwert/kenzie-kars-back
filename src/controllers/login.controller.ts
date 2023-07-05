import { Request, Response } from "express";
import { loginTokenService } from "../services/login/login.service";
import { ILoginUser } from "../interfaces/login.interfaces";

export const loginController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const loginData: ILoginUser = req.body;

  const token = await loginTokenService(loginData);

  return res.json({
    token: token,
  });
};
