import { z } from "zod";

const imageResponseSchema = z.object({
  id: z.string().uuid(),
  imageNumber: z.number(),
  imageUrl: z.string(),
  createdAt: z.date(),
});

export { imageResponseSchema };
