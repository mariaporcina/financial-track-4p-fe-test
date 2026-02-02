import z from 'zod';
import { TransactionSchema } from '../models/Transaction.schema.ts';

const useTransactionViewModel = () => {
  // const user = ref<User | null>(null);

  async function fetchAll() {
    const response = await fetch('http://localhost:3000/transactions');

    if (!response.ok) {
      throw new Error('Something went wrong while fetching transactions');
    }

    const data = await response.json();

    return z.array(TransactionSchema).parse(data);
  }

  async function fetchById(id: number) {
    const response = await fetch(`http://localhost:3000/transactions/${id}`);

    return response.json();
  }

  return { fetchAll };
}

export default useTransactionViewModel;