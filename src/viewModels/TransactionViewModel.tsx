import z from 'zod';
import { TransactionSchema } from '../schemas/Transaction.schema.ts';
import type { TransactionFilters } from "../models/TransactionFilters.ts";

const TransactionViewModel = () => {
  async function fetchAll(filters?: TransactionFilters) {
    const params = new URLSearchParams();
    if (filters?.type) {
      params.set("type", filters.type);
    }

    const response = await fetch(`http://localhost:3000/transactions?${params.toString()}`);
    if (!response.ok) {
      throw new Error('Something went wrong while fetching transactions');
    }

    const json = await response.json();
    const data = z.array(TransactionSchema).parse(json);

    if (filters?.deleted) {
      return data.filter(t => t.deletedAt !== null);
    }

    return data.filter(t => t.deletedAt === null);
  }

  async function fetchById(id: number) {
    const response = await fetch(`http://localhost:3000/transactions/${id}`);

    return response.json();
  }

  return { fetchAll };
}

export default TransactionViewModel;