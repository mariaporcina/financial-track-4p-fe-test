import { useMutation, useQueryClient } from "@tanstack/react-query";
import TransactionViewModel from "../../viewModels/TransactionViewModel";
import { Toast } from "@base-ui/react";

export function useRemoveTransactions() {
  const toastManager = Toast.useToastManager();
  const queryClient = useQueryClient();
  const { remove } = TransactionViewModel();

  return useMutation({
    mutationKey: ['transactions'],
    mutationFn: remove,

    onSuccess: () => {
      toastManager.add({
        title: `🎉 Valor removido.`,
        description: 'Sua lista está atualizada.',
      });

      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
    onError: () => {

      toastManager.add({
        title: `Oops. Algo deu errado.`,
        description: 'Tente novamente mais tarde.',
      });
      
    }
  });
}
