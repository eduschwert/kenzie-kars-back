import { z } from "zod";
import {
  imageSchemaResponse,
  vehicleSchemaRequest,
  vehicleSchemaResponse,
  vehicleSchemaUpdate,
  vehiclesSchemaResponse,
} from "../schemas/vehicles.schema";

type VehicleRequest = z.infer<typeof vehicleSchemaRequest>;
type VehicleRequestWithFipe = VehicleRequest & {
  fipe_price: number;
};

type VehicleUpdate = z.infer<typeof vehicleSchemaUpdate>;
type VehicleUpdateWithFipe = VehicleUpdate & {
  fipe_price: number;
};

type VehicleResponse = z.infer<typeof vehicleSchemaResponse>;
type VehicleResponseList = z.infer<typeof vehiclesSchemaResponse>;

type ImageResponse = z.infer<typeof imageSchemaResponse>;

export {
  VehicleRequest,
  VehicleRequestWithFipe,
  VehicleUpdate,
  VehicleUpdateWithFipe,
  VehicleResponse,
  VehicleResponseList,
  ImageResponse,
};
