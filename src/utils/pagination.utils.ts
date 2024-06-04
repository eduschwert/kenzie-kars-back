import { Request } from "express";
import {
  PaginationParamsController,
  PaginationParamsService,
} from "../interfaces";

const parsePerPageQueryParam = (param: string): number => {
  const value: number = parseInt(param, 10);
  return !isNaN(value) && value >= 1 && value <= 30 ? value : 12;
};

const parsePageQueryParam = (param: string): number => {
  const value: number = parseInt(param, 10);
  return !isNaN(value) && value >= 1 ? value : 1;
};

const getPaginationParamsController = (
  req: Request
): PaginationParamsController => {
  const perPageQueryParam: string = req.query.perPage?.toString() ?? "";
  const pageQueryParam: string = req.query.page?.toString() ?? "";

  const perPage = parsePerPageQueryParam(perPageQueryParam);
  const page = parsePageQueryParam(pageQueryParam);

  const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}`;

  const startIndex: number = (page - 1) * perPage;

  const previousPage =
    page > 1 ? `${baseUrl}?perPage=${perPage}&page=${page - 1}` : null;

  return {
    perPage,
    page,
    baseUrl,
    startIndex,
    previousPage,
  };
};

const getPaginationParamsService = (
  totalCount: number,
  perPage: number,
  page: number,
  baseUrl: string
): PaginationParamsService => {
  const totalPages: number = Math.ceil(totalCount / perPage);

  const nextPage =
    page < totalPages ? `${baseUrl}?perPage=${perPage}&page=${page + 1}` : null;

  return { totalPages, nextPage };
};

export default { getPaginationParamsController, getPaginationParamsService };
