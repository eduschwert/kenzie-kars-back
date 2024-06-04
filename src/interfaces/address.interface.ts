import { z } from "zod";

import {
  addressResponseSchema,
  addressRequestSchema,
} from "../schemas/address.schema";

type AddressRequest = z.infer<typeof addressRequestSchema>;
type AddressResponse = z.infer<typeof addressResponseSchema>;

export { AddressRequest, AddressResponse };
