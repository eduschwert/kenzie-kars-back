import { z } from "zod";

import {
  commentResponseSchema,
  imageResponseSchema,
  userResponseSchemaWithoutPasswordAndAddress,
} from ".";

const vehicleRequestSchema = z.object({
  brand: z.string().max(50),
  model: z.string().max(50),
  year: z.string().max(4),
  fuel: z.number().min(1).max(3),
  mileage: z.number().int(),
  color: z.string().max(30),
  price: z.number(),
  description: z.string().nullish(),
  coverImage: z.string(),
  images: z
    .array(z.string())
    .refine((value) => value.length <= 6, {
      message: "Images array should have at most 6 elements",
    })
    .optional(),
});

const vehicleResponseSchema = vehicleRequestSchema
  .omit({ images: true })
  .extend({
    id: z.string().uuid(),
    fipePrice: z.number().or(z.string().transform(Number)),
    mileage: z.number().or(z.string().transform(Number)),
    price: z.number().or(z.string().transform(Number)),
    isGoodBuy: z.boolean(),
    isActive: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date(),
  });

const vehicleUpdateSchema = vehicleRequestSchema.extend({
  isActive: z.boolean().default(true),
});

const vehicleResponseListSchemaWithOneUser = z.object({
  user: userResponseSchemaWithoutPasswordAndAddress,
  vehicles: vehicleResponseSchema.array(),
});

const vehicleResponseSchemaWithUser = vehicleResponseSchema.extend({
  user: userResponseSchemaWithoutPasswordAndAddress,
});

const vehicleResponseSchemaWithUserAndImages =
  vehicleResponseSchemaWithUser.extend({
    images: imageResponseSchema.array().optional(),
  });

const vehicleResponseSchemaWithImages =
  vehicleResponseSchemaWithUserAndImages.omit({ user: true });

const vehicleResponseSchemaWithUserAndImagesAndComments =
  vehicleResponseSchemaWithUserAndImages.extend({
    comments: commentResponseSchema.array(),
  });

export {
  vehicleRequestSchema,
  vehicleUpdateSchema,
  vehicleResponseSchema,
  vehicleResponseListSchemaWithOneUser,
  vehicleResponseSchemaWithUser,
  vehicleResponseSchemaWithUserAndImages,
  vehicleResponseSchemaWithImages,
  vehicleResponseSchemaWithUserAndImagesAndComments,
};
