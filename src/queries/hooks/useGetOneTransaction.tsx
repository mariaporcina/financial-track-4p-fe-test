import { useQuery } from "@tanstack/react-query";
import TransactionViewModel from "../../viewModels/TransactionViewModel";

export function useGetOneTransaction(id: string) {
  const { getById } = TransactionViewModel();

  return useQuery({
    queryKey: ["transactions", id],
    queryFn: () => getById(id),
    enabled: !!id,
  });
}
