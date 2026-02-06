import z from "zod";

export const SearchSchema = z.object({
  type: z.enum(["income", "outcome"]).optional(),
  deleted: z.boolean().optional(),
  selected: z.string().optional(),
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().optional().default(10),
});

export type Search = z.infer<typeof SearchSchema>;