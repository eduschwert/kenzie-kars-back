import { z } from "zod";
import {
  imageSchema,
  vehicleSchema,
  vehicleSchemaRequest,
  vehicleSchemaResponse,
} from "../schemas/vehicles.schema";

type TVehicleRequest = z.infer<typeof vehicleSchemaRequest>;
type TVehicle = z.infer<typeof vehicleSchema>;

type TVehicleWithoutImages = Omit<TVehicleRequest, "images">;

type TVehicleWithFipe = TVehicleRequest & {
  fipe_price: number;
};

type TImageResponse = z.infer<typeof imageSchema>;

type TVehicleResponse = z.infer<typeof vehicleSchemaResponse>;

type TVehicleFipeApi = {
  id: string;
  name: string;
  brand: string;
  year: number;
  fuel: number;
  value: number;
};

// type TPaginationResult = {
//   count: number;
//   previousPage: string | null;
//   nextPage: string | null;
//   data: TVehicleResponse[];
// };

export {
  TVehicle,
  TVehicleRequest,
  TVehicleWithoutImages,
  TVehicleResponse,
  TVehicleWithFipe,
  TVehicleFipeApi,
  TImageResponse,
};
