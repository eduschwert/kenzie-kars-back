import { Request, Response, NextFunction } from "express";

const verifyGoodBuyMiddleware = (
  req: Request,
  _: Response,
  next: NextFunction
): void => {
  const { price, fipePrice } = req.body;

  const isGoodBuy = price <= fipePrice * 0.95;

  req.body = {
    ...req.body,
    isGoodBuy: isGoodBuy,
  };

  return next();
};

export default verifyGoodBuyMiddleware;
