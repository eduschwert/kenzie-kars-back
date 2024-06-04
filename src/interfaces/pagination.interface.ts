type PaginationParamsController = {
  perPage: number;
  page: number;
  baseUrl: string;
  startIndex: number;
  previousPage: string | null;
};

type PaginationParamsService = {
  totalPages: number;
  nextPage: string | null;
};

type PaginationResult<T> = {
  totalPages: number;
  count: number;
  previousPage: string | null;
  nextPage: string | null;
  data: T;
};

export {
  PaginationParamsController,
  PaginationParamsService,
  PaginationResult,
};
