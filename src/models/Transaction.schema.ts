// models/Transaction.schema.ts
import { z } from "zod";

export const TransactionSchema = z.object({
  id: z.string(),
  type: z.enum(["income", "outcome"]),
  amount: z.number(),
  deletedAt: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Transaction = z.infer<typeof TransactionSchema>;
