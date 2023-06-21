import { z } from "zod";
import {
  imageSchemaResponse,
  vehicleSchemaRequest,
  vehicleSchemaResponseWithImages,
  vehicleSchemaUpdate,
  vehiclesSchemaResponseWithImages,
} from "../schemas/vehicles.schema";

type TVehicleRequest = z.infer<typeof vehicleSchemaRequest>;
type TVehicleUpdate = z.infer<typeof vehicleSchemaUpdate>;
type TVehicleResponse = z.infer<typeof vehicleSchemaResponseWithImages>;

type TVehiclesResponse = z.infer<typeof vehiclesSchemaResponseWithImages>;

type TVehicleRequestWithoutImages = Omit<TVehicleRequest, "images">;

type TVehicleRequestWithFipe = TVehicleRequest & {
  fipe_price: number;
};
type TVehicleUpdateWithFipe = TVehicleUpdate & {
  fipe_price: number;
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

type TPaginationResult = {
  count: number;
  previousPage: string | null;
  nextPage: string | null;
  data: TVehiclesResponse;
};

export {
  TVehicleRequest,
  TVehicleRequestWithoutImages,
  TVehicleUpdate,
  TVehicleResponse,
  TVehicleRequestWithFipe,
  TVehicleFipeApi,
  TVehicleUpdateWithFipe,
  TImageResponse,
  TPaginationResult,
};
