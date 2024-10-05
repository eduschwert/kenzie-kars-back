import { z } from "zod";

import { addressRequestSchema, addressResponseSchema } from ".";

const emailSchema = z.string().max(100).email();

const userEmailSchema = z.object({
  email: emailSchema,
});

const passwordSchema = z
  .string()
  .min(6, "Password must have at least 6 characters")
  .max(100, "Password cannot exceed 100 characters")
  .regex(
    /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d!@#$%^&* ]*$/,
    "Password must contain at least one letter and one number"
  );

const userPasswordSchema = z.object({
  password: passwordSchema,
});

const userPasswordUpdateSchema = userPasswordSchema.extend({
  newPassword: passwordSchema,
});

const userRequestSchema = userPasswordSchema.extend({
  name: z.string().min(3).max(100),
  email: emailSchema,
  cpf: z
    .string()
    .length(11)
    .regex(/^\d+$/, { message: "CPF must contain only numbers" }),
  phone: z
    .string()
    .length(11)
    .regex(/^\d+$/, { message: "Phone must contain only numbers" }),
  birthdate: z.string().date(),
  description: z.string().max(2000).nullish(),
  isSeller: z.boolean().default(true),
  address: addressRequestSchema,
});

const userUpdateSchema = userRequestSchema.omit({
  isSeller: true,
  address: true,
  password: true,
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

const userResponseSchemaPublic =
  userResponseSchemaWithoutPasswordAndAddress.omit({
    email: true,
    cpf: true,
    phone: true,
    birthdate: true,
    isSeller: true,
  });

export {
  userEmailSchema,
  userPasswordSchema,
  userPasswordUpdateSchema,
  userRequestSchema,
  userUpdateSchema,
  userResponseSchemaWithoutPassword,
  userResponseSchemaWithoutPasswordAndAddress,
  userResponseSchemaPublic,
};
