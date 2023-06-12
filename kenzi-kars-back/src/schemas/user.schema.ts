import { z } from "zod";

const addressSchema = z.object({
  cep: z.string().max(9),
  state: z.string().max(2),
  city: z.string().max(50),
  street_number: z.string().max(50),
  complement: z.string().max(50).optional().nullable(),
  street_name: z.string().max(50),
});

export const returnAddressSchema = addressSchema.extend({
  id: z.string(),
  createdAt: z.string(),
});

export const userSchema = z.object({
  name: z.string().max(100),
  email: z.string().max(50),
  password: z.string().max(120),
  cpf: z.string().max(14),
  phone: z.string().max(16),
  birthdate: z.string().or(z.date()),
  description: z.string(),
  is_seller: z.boolean().optional().default(false),
  address: addressSchema,
});

export const returnUserSchemaNoPassword = userSchema
  .extend({
    id: z.string(),
    createdAt: z.string(),
    address: returnAddressSchema,
  })
  .omit({
    password: true,
  });
