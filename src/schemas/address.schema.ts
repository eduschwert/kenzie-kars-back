import { z } from "zod";

const states = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
] as const;

const addressRequestSchema = z.object({
  cep: z
    .string()
    .length(8)
    .regex(/^\d+$/, { message: "CEP must contain only numbers" }),
  state: z.enum(states),
  city: z.string().max(50),
  street: z.string().max(50),
  number: z
    .string()
    .max(10)
    .regex(/^\d+$/, { message: "Number must contain only numbers" }),
  complement: z.string().max(50).nullish(),
});

const addressResponseSchema = addressRequestSchema.extend({
  id: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export { addressRequestSchema, addressResponseSchema };
