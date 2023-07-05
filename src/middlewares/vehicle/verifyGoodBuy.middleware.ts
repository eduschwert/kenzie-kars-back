import { Request, Response, NextFunction } from "express";

const verifyGoodBuyMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let { price, fipe_price } = req.body;

  const isGoodBuy = price <= fipe_price * 0.95;

  req.body = {
    ...req.body,
    is_good_buy: isGoodBuy,
  };

  return next();
};

export default verifyGoodBuyMiddleware;
