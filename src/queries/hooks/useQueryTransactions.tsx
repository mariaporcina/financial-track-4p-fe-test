import { useQuery } from "@tanstack/react-query";
import TransactionViewModel from "../../viewModels/TransactionViewModel";
import type { TransactionFilters } from "../../models/TransactionFilters";

export function useQueryTransactions(filters?: TransactionFilters) {
  const { getAll } = TransactionViewModel();

  return useQuery({
    queryKey: ["transactions", filters],
    queryFn: () => getAll(filters),
  });
}
