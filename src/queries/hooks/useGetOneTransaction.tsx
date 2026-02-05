import { useQuery, useQueryClient } from "@tanstack/react-query";
import TransactionViewModel from "../../viewModels/TransactionViewModel";

export function useGetOneTransaction(id: string) {
  // const queryClient = useQueryClient();
  const { getById } = TransactionViewModel();

  return useQuery({
    queryKey: ["transactions", id],
    queryFn: () => getById(id),
    enabled: !!id,
    // initialData: () => {
    //   const transactions =
    //     queryClient.getQueryData<any[]>(["transactions"]);

    //   return transactions?.find(t => t.id === id);
    // },
    // retry: true,
    // retryDelay: 500,
  });
}
