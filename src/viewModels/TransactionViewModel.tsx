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
    const allData = z.array(TransactionSchema).parse(json);

    // Filtrar por deleted
    let filteredData = [];
    if (filters?.deleted) {
      filteredData = allData.filter(t => t.deletedAt !== null);
    } else {
      filteredData = allData.filter(t => t.deletedAt === null);
    }

    filteredData.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateB - dateA;
    });

    // Aplicar paginação
    const page = filters?.page || 1;
    const limit = filters?.limit || 8;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    return {
      data: paginatedData,
      pagination: {
        page,
        limit,
        total: filteredData.length,
        totalPages: Math.ceil(filteredData.length / limit),
      },
    };
  }

  async function create(data: Partial<Transaction>) {
    const response = await fetch(`http://localhost:3000/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        deletedAt: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }),
    });

    const json = await response.json();

    return TransactionSchema.parse(json);
  }

  async function remove(id: string) {
    await fetch(`http://localhost:3000/transactions/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        deletedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }),
    });
  }

  async function restore(id: string) {
    await fetch(`http://localhost:3000/transactions/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        deletedAt: null,
        updatedAt: new Date().toISOString(),
      }),
    });
  }

  async function update(params: {id: string, data: Partial<Transaction>}) {
    const { id, data } = params;

    const response = await fetch(`http://localhost:3000/transactions/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        updatedAt: new Date().toISOString(),
      }),
    });

    const json = await response.json();

    return TransactionSchema.parse(json);
  }

  async function getById(id: string) {
    const response = await fetch(`http://localhost:3000/transactions/${id}`);
    
    if (!response.ok) {
      throw new Error('Something went wrong while fetching transactions');
    }

    const data = await response.json();
    return TransactionSchema.parse(data);
  }

  return { getAll, getById, create, update, remove, restore };
}

export default TransactionViewModel;