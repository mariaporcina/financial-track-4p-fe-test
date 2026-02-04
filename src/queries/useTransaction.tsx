import { useQuery } from "@tanstack/react-query";
import TransactionViewModel from "../viewModels/TransactionViewModel";
import type { TransactionFilters } from "../models/TransactionFilters";

export function useTransactions(filters?: TransactionFilters) {
  const { fetchAll } = TransactionViewModel();

  return useQuery({
    queryKey: ["transactions", filters],
    queryFn: () => fetchAll(filters),
  });
}
