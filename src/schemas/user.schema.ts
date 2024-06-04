import { z } from "zod";
import { addressRequestSchema, addressResponseSchema } from ".";

const userEmailSchema = z.object({
  email: z.string().max(100).email(),
});

const userPasswordSchema = z.object({
  password: z
    .string()
    .min(6, "Password must have at least 6 characters")
    .max(100, "Password cannot exceed 100 characters")
    .regex(
      /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d!@#$%^&* ]*$/,
      "Password must contain at least one letter and one number"
    ),
});

const userRequestSchema = userPasswordSchema.extend({
  name: z.string().max(100),
  email: z.string().max(100).email(),
  cpf: z.string().max(11),
  phone: z.string().max(11),
  birthdate: z.coerce
    .date()
    .transform((value) => value.toISOString().split("T")[0]),
  description: z.string().nullish(),
  isSeller: z.boolean().default(false),
  address: addressRequestSchema,
});

const userUpdateSchema = userRequestSchema.omit({
  isSeller: true,
  address: true,
});

const userResponseSchemaWithoutPassword = userRequestSchema
  .extend({
    id: z.string().uuid(),
    createdAt: z.date(),
    updatedAt: z.date(),
    address: addressResponseSchema,
  })
  .omit({
    password: true,
  });

const userResponseSchemaWithoutPasswordAndAddress =
  userResponseSchemaWithoutPassword.omit({
    address: true,
  });

export {
  userEmailSchema,
  userPasswordSchema,
  userRequestSchema,
  userUpdateSchema,
  userResponseSchemaWithoutPassword,
  userResponseSchemaWithoutPasswordAndAddress,
};
