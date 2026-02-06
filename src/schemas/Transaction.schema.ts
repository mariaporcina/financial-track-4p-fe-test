import { z } from "zod";

export const TransactionSchema = z.object({
  id: z.string(),
  type: z.enum(["income", "outcome"]),
  amount: z.number().positive().refine((val) => val !== 0),
  deletedAt: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Transaction = z.infer<typeof TransactionSchema>;
