import { z } from "zod";
import {
  addressSchemaRequest,
  addressSchemaResponse,
} from "../schemas/address.schema";

type TAddressRequest = z.infer<typeof addressSchemaRequest>;
type TAddressResponse = z.infer<typeof addressSchemaResponse>;

export { TAddressRequest, TAddressResponse };
