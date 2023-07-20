import { z } from "zod";

const addressSchemaRequest = z.object({
  cep: z.string().regex(/^\d{5}-\d{3}$/, "CEP must be in the format XXXXX-XXX"),
  state: z.string().max(2),
  city: z.string().max(50),
  street: z.string().max(50),
  number: z.string().max(10),
  complement: z.string().max(50).nullish(),
});

const addressSchemaResponse = addressSchemaRequest.extend({
  id: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export { addressSchemaRequest, addressSchemaResponse };
