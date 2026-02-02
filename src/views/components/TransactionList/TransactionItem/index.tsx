
import { DownloadIcon, UploadIcon, TrashIcon } from '@radix-ui/react-icons';

import type { Transaction } from "../../../../models/Transaction.schema";
import { Button } from '@base-ui/react';

type TransactionItemProps = {
  transaction: Transaction
}

const TransactionItem = ({ transaction }: TransactionItemProps) => {
  const { type, amount } = transaction;

  const isOutcome = type === 'outcome';

  return (
    <li className={`flex items-center gap-2 bg-[#171717] px-5 py-4 border-b border-1 border-[#262626] ${isOutcome ? 'text-[#DB2777]' : 'text-[#10B981]'} `}>
      {isOutcome ? <UploadIcon /> : <DownloadIcon />}

      <span className="flex-2">{amount}</span>

      <Button className="bg-[#2B1921] p-2 rounded-md cursor-pointer">
        <TrashIcon className='size-5 text-[#DB2777]' />
      </Button>
    </li>
  )
}

export default TransactionItem
