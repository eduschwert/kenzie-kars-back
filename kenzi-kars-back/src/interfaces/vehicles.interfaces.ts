import { z } from "zod";
import {
  imageSchemaResponse,
  vehicleSchemaRequest,
  vehicleSchemaResponse,
  vehicleSchemaUpdate,
  vehiclesSchemaResponse,
} from "../schemas/vehicles.schema";

type TVehicleRequest = z.infer<typeof vehicleSchemaRequest>;
type TVehicleRequestWithFipe = TVehicleRequest & {
  fipe_price: number;
};

type TVehicleUpdate = z.infer<typeof vehicleSchemaUpdate>;
type TVehicleUpdateWithFipe = TVehicleUpdate & {
  fipe_price: number;
};

type TVehicleResponse = z.infer<typeof vehicleSchemaResponse>;

type TVehiclesResponse = z.infer<typeof vehiclesSchemaResponse>;

type TPaginationResult<T> = {
  count: number;
  previousPage: string | null;
  nextPage: string | null;
  data: T;
};
type TImageResponse = z.infer<typeof imageSchemaResponse>;

type TVehicleFipeApi = {
  id: string;
  name: string;
  brand: string;
  year: number;
  fuel: number;
  value: number;
};

export {
  TVehicleRequest,
  TVehicleUpdate,
  TVehicleRequestWithFipe,
  TVehicleResponse,
  TPaginationResult,
  TVehicleFipeApi,
  TVehiclesResponse,
  TVehicleUpdateWithFipe,
  TImageResponse,
};
