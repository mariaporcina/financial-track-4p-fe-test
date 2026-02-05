import { useMutation, useQueryClient } from "@tanstack/react-query";
import TransactionViewModel from "../../viewModels/TransactionViewModel";
import { Toast } from "@base-ui/react";

export function useUpdateTransactions() {
  const toastManager = Toast.useToastManager();
  const queryClient = useQueryClient();
  const { update } = TransactionViewModel();

  const types = {
    'income': 'entrada',
    'outcome': 'saída'
  }

  return useMutation({
    mutationKey: ['transactions'],
    mutationFn: update,

    onSuccess: (query) => {
      toastManager.add({
        title: `🎉 Valor de ${types[query.type]} atualizado`,
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
