import { Request, Response } from "express";

import { loginService } from "../services";
import { LoginRequest } from "../interfaces";

const login = async (req: Request, res: Response): Promise<Response> => {
  const loginData: LoginRequest = req.body;

  const token = await loginService(loginData);

  return res.json({
    accessToken: token,
  });
};

export default login;
