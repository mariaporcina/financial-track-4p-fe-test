import { useMutation, useQueryClient } from "@tanstack/react-query";
import TransactionViewModel from "../../viewModels/TransactionViewModel";
import { Toast } from "@base-ui/react";

export function useMutationTransactions() {
  const toastManager = Toast.useToastManager();
  const queryClient = useQueryClient();
  const { create } = TransactionViewModel();

  return useMutation({
    mutationKey: ['transactions'],
    mutationFn: create,

    onSuccess: (query) => {

      console.log(query)

      toastManager.add({
        title: `🎉 Valor de entrada adicionado`,
        description: 'Já pode visualizar na lista.',
      });


      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      
    },
    onError: (error) => {

      console.log(error)
      
    }
  });
}
