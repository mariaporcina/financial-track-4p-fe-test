
import TransactionItem from "./TransactionItem"

import type { Transaction } from "../../../schemas/Transaction.schema"

type TransactionListProps = {
  transactions?: Transaction[] 
}

const TransactionList = ({ transactions }: TransactionListProps) => {
  if (!transactions || !transactions.length) {
    return (
      <div className="text-center max-w-[320px] mx-auto my-25">
        <p className="text-[#FAFAFA] text-md">Nenhum lançamento cadastrado</p>
        <span className="text-[#737373] text-sm">Caso para adicionar clique em novo valor ou se quiser resgatar um antigo clique em excluídos.</span>
      </div>
    );
  }

  return (
    <ul className="border-1 border-[#262626] rounded-2xl overflow-hidden mt-5">
      {transactions?.map((transaction) => (
        <TransactionItem key={transaction.id} transaction={transaction} />
      ))}
    </ul>
  )
}

export default TransactionList
