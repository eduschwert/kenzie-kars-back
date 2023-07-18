import { z } from "zod";
import { DeepPartial } from "typeorm";

import {
  addressSchemaResponse,
  addressSchemaRequest,
} from "../schemas/address.schema";

type AddressUpdate = DeepPartial<z.infer<typeof addressSchemaRequest>>;
type AddressResponse = z.infer<typeof addressSchemaResponse>;

export { AddressUpdate, AddressResponse };
