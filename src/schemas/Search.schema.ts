import z from "zod";

export const SearchSchema = z.object({
  type: z.enum(["income", "outcome"]).optional(),
  deleted: z.boolean().optional(),
  selected: z.string().optional(),
});

export type Search = z.infer<typeof SearchSchema>;