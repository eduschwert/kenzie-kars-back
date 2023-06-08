import { z } from "zod";
import {
  imageSchema,
  vehicleSchema,
  vehicleSchemaRequest,
  vehicleSchemaResponse,
  vehicleSchemaUpdate,
  vehiclesSchemaResponse,
} from "../schemas/vehicles.schema";

type TVehicleRequest = z.infer<typeof vehicleSchemaRequest>;
type TVehicleRequestUpdate = z.infer<typeof vehicleSchemaUpdate>;
type TVehicle = z.infer<typeof vehicleSchema>;

type TVehicleWithoutImages = Omit<TVehicleRequest, "images">;

type TVehicleWithFipeRequest = TVehicleRequest & {
  fipe_price: number;
};
type TVehicleWithFipeRequestUpdate = TVehicleRequestUpdate & {
  fipe_price: number;
};

type TImageResponse = z.infer<typeof imageSchema>;

type TVehicleResponse = z.infer<typeof vehicleSchemaResponse>;
type TVehiclesResponse = z.infer<typeof vehiclesSchemaResponse>;

type TVehicleFipeApi = {
  id: string;
  name: string;
  brand: string;
  year: number;
  fuel: number;
  value: number;
};

type TPaginationResult = {
  count: number;
  previousPage: string | null;
  nextPage: string | null;
  data: TVehiclesResponse;
};

export {
  TVehicle,
  TVehicleRequest,
  TVehicleWithoutImages,
  TVehicleResponse,
  TVehicleWithFipeRequest,
  TVehicleWithFipeRequestUpdate,
  TVehicleFipeApi,
  TVehicleRequestUpdate,
  TImageResponse,
  TPaginationResult,
};
