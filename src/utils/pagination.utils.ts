import { Request } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";

import { Vehicle } from "../entities";

export type PaginationParams = {
  perPage: number;
  totalCount: number;
  totalPages: number;
  startIndex: number;
  previousPage: string | null;
  nextPage: string | null;
};

export type PaginationResult<T> = {
  totalPages: number;
  count: number;
  previousPage: string | null;
  nextPage: string | null;
  data: T;
};

const parsePerPageQueryParam = (param: string): number => {
  const value: number = parseInt(param, 10);
  return !isNaN(value) && value >= 1 && value <= 30 ? value : 12;
};

const parsePageQueryParam = (param: string): number => {
  const value: number = parseInt(param, 10);
  return !isNaN(value) && value >= 1 ? value : 1;
};

export const getPaginationParams = async (
  req: Request,
  userId?: string
): Promise<PaginationParams> => {
  const perPageQueryParam: string = req.query.perPage?.toString() ?? "";
  const pageQueryParam: string = req.query.page?.toString() ?? "";

  const perPage = parsePerPageQueryParam(perPageQueryParam);
  const page = parsePageQueryParam(pageQueryParam);

  const vehicleRepository: Repository<Vehicle> =
    AppDataSource.getRepository(Vehicle);

  const totalCount: number = userId
    ? await vehicleRepository.count({
        where: {
          user: { id: userId },
        },
      })
    : await vehicleRepository.count();

  const totalPages: number = Math.ceil(totalCount / perPage);
  const startIndex: number = (page - 1) * perPage;

  const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}`;

  const previousPage =
    page > 1 ? `${baseUrl}?perPage=${perPage}&page=${page - 1}` : null;
  const nextPage =
    page < totalPages ? `${baseUrl}?perPage=${perPage}&page=${page + 1}` : null;

  return {
    perPage,
    totalCount,
    totalPages,
    startIndex,
    previousPage,
    nextPage,
  };
};
