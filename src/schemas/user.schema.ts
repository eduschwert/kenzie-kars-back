import { z } from "zod";
import { addressSchemaRequest, addressSchemaResponse } from "./address.schema";

const userEmailSchema = z.object({
  email: z.string().email(),
});

const userPasswordSchema = z.object({
  password: z
    .string()
    .min(6, "Password must have at least 6 characters")
    .max(100, "Password cannot exceed 100 characters")
    .regex(
      /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*]*$/,
      "Password must contain at least one letter and one number"
    ),
});

const userSchemaRequest = userPasswordSchema.extend({
  name: z.string().max(100),
  email: z.string().email().max(100),
  cpf: z
    .string()
    .regex(
      /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
      "CPF must be in the format XXX.XXX.XXX-XX"
    ),
  phone: z
    .string()
    .regex(
      /^\(\d{2}\) \d{5}-\d{4}$/,
      "Phone number must be in the format (XX) XXXXX-XXXX"
    ),
  birthdate: z.coerce
    .date()
    .transform((value) => value.toISOString().split("T")[0]),
  description: z.string(),
  isSeller: z.boolean().default(false),
  address: addressSchemaRequest,
});

const userSchemaUpdate = userSchemaRequest.omit({
  isSeller: true,
  address: true,
});

const userSchemaResponseWithoutPassword = userSchemaRequest
  .extend({
    id: z.string().uuid(),
    createdAt: z.date(),
    updatedAt: z.date(),
    address: addressSchemaResponse,
  })
  .omit({
    password: true,
  });

const userSchemaResponseWithoutPasswordAndAddress =
  userSchemaResponseWithoutPassword.omit({
    address: true,
  });

export {
  userEmailSchema,
  userPasswordSchema,
  userSchemaRequest,
  userSchemaUpdate,
  userSchemaResponseWithoutPassword,
  userSchemaResponseWithoutPasswordAndAddress,
};
