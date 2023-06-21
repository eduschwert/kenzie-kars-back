import { z } from "zod";

const addressSchemaRequest = z.object({
  cep: z.string().max(9),
  state: z.string().max(2),
  city: z.string().max(50),
  street_number: z.string().max(50),
  complement: z.string().max(50).default("no complement"),
  street_name: z.string().max(50),
});

const addressSchemaResponse = addressSchemaRequest.extend({
  id: z.string(),
  createdAt: z.string(),
});

export { addressSchemaRequest, addressSchemaResponse };
