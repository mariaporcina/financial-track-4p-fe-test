
import { DownloadIcon, UploadIcon, TrashIcon } from '@radix-ui/react-icons';

import type { Transaction } from "../../../../schemas/Transaction.schema";
import { Button } from '@base-ui/react';

type TransactionItemProps = {
  transaction: Transaction
  remove: (id: string) => Promise<void>
  restore: (id: string) => Promise<void>
}

const TransactionItem = ({ transaction, remove, restore }: TransactionItemProps) => {
  const { id, type, amount, deletedAt } = transaction;

  const isOutcome = type === 'outcome';

  return (
    <li className={`flex items-center gap-2 bg-[#171717] px-5 py-4 border-b border-1 border-[#262626] ${isOutcome ? 'text-[#DB2777]' : 'text-[#10B981]'} `}>
      {isOutcome ? <UploadIcon /> : <DownloadIcon />}

      <span className="flex-2">{amount}</span>

      {!deletedAt ? (
        <Button onClick={() => remove(id)} className="bg-[#2B1921] p-2 rounded-md cursor-pointer">
          <TrashIcon className='size-5 text-[#DB2777]' />
        </Button>
      ): (
        <Button onClick={() => restore(id)} className="bg-[#171717] hover:bg-[#262626] transition-all border-1 border-[#262626] p-2 rounded-full text-[#FAFAFA] text-sm px-3.5 py-1.5 cursor-pointer">Restaurar</Button>
      )}
    </li>
  )
}

export default TransactionItem
