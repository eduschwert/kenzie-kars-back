import { z } from "zod";
import {
  returnUserSchemaNoPassword,
  returnUserSchemaVehicle,
} from "./user.schema";

const vehicleSchema = z.object({
  id: z.string().uuid(),
  brand: z.string().max(50),
  model: z.string().max(50),
  year: z.string().max(4),
  fuel: z.number(),
  mileage: z.number(),
  color: z.string().max(30),
  fipe_price: z.number(),
  price: z.number(),
  is_good_buy: z.boolean(),
  is_active: z.boolean(),
  description: z.string(),
  cover_image: z.string().max(256),
  images: z
    .array(z.string().max(256))
    .refine((value) => value.length <= 6, {
      message: "Images array should have at most 6 elements",
    })
    .optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

const vehicleSchemaRequest = vehicleSchema.omit({
  id: true,
  fipe_price: true,
  is_good_buy: true,
  is_active: true,
  createdAt: true,
  updatedAt: true,
});

const vehicleSchemaUpdate = vehicleSchemaRequest.extend({
  is_active: z.boolean(),
});

const imageSchema = z.object({
  id: z.string().uuid(),
  image_number: z.number(),
  image_url: z.string(),
  createdAt: z.date(),
});

const vehicleSchemaResponse = vehicleSchema.extend({
  images: z.array(imageSchema).optional(),
  seller: returnUserSchemaVehicle,
});
const vehiclesSchemaResponse = z.array(vehicleSchemaResponse);

export {
  vehicleSchema,
  vehicleSchemaUpdate,
  vehicleSchemaRequest,
  vehicleSchemaResponse,
  vehiclesSchemaResponse,
  imageSchema,
};
