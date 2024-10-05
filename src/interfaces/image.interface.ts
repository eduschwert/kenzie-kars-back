import { z } from "zod";

import { imageResponseSchema } from "../schemas";

type ImageResponse = z.infer<typeof imageResponseSchema>;

export { ImageResponse };
