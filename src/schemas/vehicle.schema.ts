import { z } from "zod";

import {
  commentResponseSchema,
  imageResponseSchema,
  userResponseSchemaPublic,
} from ".";

const colors = [
  "Branco",
  "Preto",
  "Cinza",
  "Prata",
  "Vermelho",
  "Azul",
  "Verde",
  "Amarelo",
  "Laranja",
  "Roxo",
  "Marrom",
] as const;

const vehicleRequestSchema = z.object({
  brand: z.string().max(50),
  model: z.string().max(50),
  year: z.string().max(4),
  fuel: z.number().int().min(1).max(3),
  mileage: z.number().int(),
  color: z.enum(colors),
  price: z.number().int(),
  description: z.string().nullish(),
  coverImage: z.string().url().max(600),
  images: z
    .array(z.string().url().max(600))
    .refine((value) => value.length <= 6, {
      message: "Images array should have at most 6 elements",
    })
    .optional(),
});

const vehicleResponseSchema = vehicleRequestSchema
  .omit({ images: true })
  .extend({
    id: z.string().uuid(),
    fipePrice: z.number().int().or(z.string().transform(Number)),
    mileage: z.number().int().or(z.string().transform(Number)),
    price: z.number().int().or(z.string().transform(Number)),
    isGoodBuy: z.boolean(),
    isActive: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date(),
  });

const vehicleUpdateSchema = vehicleRequestSchema.extend({
  isActive: z.boolean().default(true),
});

const vehicleResponseSchemaWithUser = vehicleResponseSchema.extend({
  user: userResponseSchemaPublic,
});

const vehicleResponseListSchemaWithOneUser = z.object({
  user: userResponseSchemaPublic,
  vehicles: vehicleResponseSchema.array(),
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
    user: userResponseSchemaPublic.extend({
      phone: z
        .string()
        .length(11)
        .regex(/^\d+$/, { message: "Phone must contain only numbers" })
        .nullish(),
    }),
  });

export {
  vehicleRequestSchema,
  vehicleUpdateSchema,
  vehicleResponseSchema,
  vehicleResponseSchemaWithUser,
  vehicleResponseListSchemaWithOneUser,
  vehicleResponseSchemaWithUserAndImages,
  vehicleResponseSchemaWithImages,
  vehicleResponseSchemaWithUserAndImagesAndComments,
};
