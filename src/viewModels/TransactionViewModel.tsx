import z from 'zod';
import { TransactionSchema, type Transaction } from '../schemas/Transaction.schema.ts';
import type { TransactionFilters } from "../models/TransactionFilters.ts";

const TransactionViewModel = () => {
  async function getAll(filters?: TransactionFilters) {
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

  async function create(transaction: Transaction) {
    const response = await fetch(`http://localhost:3000/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transaction),
    });

    if (!response.ok) {
      throw new Error('Something went wrong while adding transaction');
    }

    const data = await response.json();

    return TransactionSchema.parse(data);
  }

  async function fetchById(id: number) {
    const response = await fetch(`http://localhost:3000/transactions/${id}`);

    return response.json();
  }

  return { getAll, create };
}

export default TransactionViewModel;