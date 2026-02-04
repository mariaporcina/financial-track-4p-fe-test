import { useMutation, useQueryClient } from "@tanstack/react-query";
import TransactionViewModel from "../../viewModels/TransactionViewModel";
import { Toast } from "@base-ui/react";

export function useRestoreTransactions() {
  const toastManager = Toast.useToastManager();
  const queryClient = useQueryClient();
  const { restore } = TransactionViewModel();

  return useMutation({
    mutationKey: ['transactions'],
    mutationFn: restore,

    onSuccess: () => {
      toastManager.add({
        title: `Valor restaurado.`,
        description: 'Já pode visualizar na lista.',
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
