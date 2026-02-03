// queries/useTransactions.ts
import { useQuery } from "@tanstack/react-query";
import useTransactionViewModel from "../viewModels/UseTransactionViewModel";
import type { TransactionFilters } from "../models/TransactionFilters";

export function useTransactions(filters?: TransactionFilters) {
  const { fetchAll } = useTransactionViewModel();

  return useQuery({
    queryKey: ["transactions", filters],
    queryFn: () => fetchAll(filters),
  });
}
