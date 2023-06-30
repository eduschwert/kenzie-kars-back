import { z } from "zod";
import {
  addressSchemaResponse,
  addressSchemaRequest,
} from "../schemas/address.schema";
import { DeepPartial } from "typeorm";

type TAddressUpdate = DeepPartial<z.infer<typeof addressSchemaRequest>>;
type TAddressResponse = z.infer<typeof addressSchemaResponse>;

export { TAddressUpdate, TAddressResponse };
