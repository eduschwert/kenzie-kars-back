import { z } from "zod";
import { addressSchemaRequest, addressSchemaResponse } from "./address.schema";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,100}$/;

const userSchemaRequest = z.object({
  name: z.string().max(100),
  email: z.string().email().max(50),
  password: z.string().refine((value) => passwordRegex.test(value), {
    message:
      "Password must contain at least 8 characters, including at least one lowercase letter, one uppercase letter, one digit, and one special character.",
  }),
  cpf: z.string().max(14),
  phone: z.string().max(16),
  birthdate: z.coerce.date(),
  description: z.string(),
  is_seller: z.boolean().optional().default(false),
  address: addressSchemaRequest,
  tokenResetPassword: z.string().optional().nullable(),
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
    updatedAt: z.string(),
    address: addressSchemaResponse,
  })
  .omit({
    password: true,
  });

const userSchemaResponseWithoutPasswordAndAddress = userSchemaRequest
  .extend({
    id: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
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
