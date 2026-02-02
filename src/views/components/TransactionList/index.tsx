
import TransactionItem from "./TransactionItem"

import type { Transaction } from "../../../models/Transaction.schema"

type TransactionListProps = {
  transactions?: Transaction[] 
}

const TransactionList = ({ transactions }: TransactionListProps) => {

  return (
    <ul className="border-1 border-[#262626] rounded-2xl overflow-hidden mt-5">
      {transactions?.map((transaction) => (
        <TransactionItem key={transaction.id} transaction={transaction} />
      ))}
    </ul>
  )
}

export default TransactionList
