import { z } from "zod";
import { addressSchemaRequest, addressSchemaResponse } from "./address.schema";

const userSchemaRequest = z.object({
  name: z.string().max(100),
  email: z.string().max(50),
  password: z.string().max(120),
  cpf: z.string().max(14),
  phone: z.string().max(16),
  birthdate: z.string().or(z.date()),
  description: z.string(),
  is_seller: z.boolean().default(false),
  address: addressSchemaRequest,
});

const userSchemaWithoutAdress = userSchemaRequest.omit({
  is_seller: true,
  address: true,
});

const userSchemaUpdate = userSchemaWithoutAdress.partial();

const userSchemaResponseWithoutPassword = userSchemaRequest
  .extend({
    id: z.string(),
    createdAt: z.string(),
    address: addressSchemaResponse,
  })
  .omit({
    password: true,
  });

const userSchemaResponseWithoutPasswordAndAddress = userSchemaRequest
  .extend({
    id: z.string(),
    createdAt: z.string(),
    address: addressSchemaResponse,
  })
  .omit({
    password: true,
    address: true,
  });

export {
  userSchemaRequest,
  userSchemaUpdate,
  userSchemaWithoutAdress,
  userSchemaResponseWithoutPassword,
  userSchemaResponseWithoutPasswordAndAddress,
};
