import { z } from "zod";

const addressRequestSchema = z.object({
  cep: z.string().max(8),
  state: z.string().max(2),
  city: z.string().max(50),
  street: z.string().max(50),
  number: z.string().max(10),
  complement: z.string().max(50).nullish(),
});

const addressResponseSchema = addressRequestSchema.extend({
  id: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export { addressRequestSchema, addressResponseSchema };
