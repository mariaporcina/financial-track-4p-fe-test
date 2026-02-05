
import TransactionItem from "./TransactionItem"
import { Outlet, useSearch } from "@tanstack/react-router";
import { useQueryTransactions } from "../../../queries/hooks/useQueryTransactions";
import { useRemoveTransactions } from "../../../queries/hooks/useRemoveTransactions";
import { useRestoreTransactions } from "../../../queries/hooks/useRestoreTransactions";
import Pagination from "../Pagination";

const TransactionList = () => {
  const search = useSearch({ from: '/transactions' });

  const { type, deleted } = search;
  const { data: transactions, isLoading } = useQueryTransactions({ type, deleted });

  const { mutateAsync: remove } = useRemoveTransactions();
  
  const { mutateAsync: restore } = useRestoreTransactions();

  if (isLoading) {
    return (
      <div className="text-center max-w-[320px] mx-auto my-25">
        <p className="text-[#FAFAFA] text-md">Carregando...</p>
      </div>
    );
  }

  if (!transactions || !transactions.length) {
    return (
      <div className="text-center max-w-[320px] mx-auto my-25">
        <p className="text-[#FAFAFA] text-md">Nenhum lançamento cadastrado</p>
        <span className="text-[#737373] text-sm">Caso para adicionar clique em novo valor ou se quiser resgatar um antigo clique em excluídos.</span>
      </div>
    );
  }

  return (
    <>
      <ul className="border-1 border-[#262626] rounded-2xl overflow-hidden mt-5">
        {transactions?.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            transaction={transaction}
            remove={remove}
            restore={restore}
          />
        ))}
      </ul>
    
      {transactions?.length ? <Pagination /> : null}

      <Outlet />
    </>
  )
}

export default TransactionList
