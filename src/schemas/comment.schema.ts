import { string, z } from "zod";
import { vehicleSchemaResponse } from "./vehicles.schema";

const vehicleId = z.object({
  id: z.string().uuid(),
});

const commentOwner = z.object({
  name: z.string(),
  id: z.string().uuid(),
});

export const commentSchemaRequest = z.object({
  content: z.string().min(3).max(2000),
});

export const commentSchemaResponse = commentSchemaRequest.extend({
  id: z.string(),
  createdAt: z.date(),
  owner: commentOwner,
  vehicle: vehicleId,
});

export const commentSchemaList = z.array(commentSchemaResponse);
