
import { DownloadIcon, UploadIcon, TrashIcon } from '@radix-ui/react-icons';

import type { Transaction } from "../../../../schemas/Transaction.schema";
import { Button } from '@base-ui/react';
import { Link, useNavigate, useSearch } from '@tanstack/react-router';

type TransactionItemProps = {
  transaction: Transaction
  remove: (id: string) => Promise<void>
  restore: (id: string) => Promise<void>
  view: (id: string) => void
}

const TransactionItem = ({ transaction, remove, restore, view }: TransactionItemProps) => {
  const { id, type, amount, deletedAt } = transaction;

  const isOutcome = type === 'outcome';

  const navigate = useNavigate();
  const search = useSearch({ from: '/transactions' });

  const handleClick = () => {
    navigate({ to: '/transactions/$id', params: { id } })
  }

  return (
    <li onClick={handleClick} className={`cursor-pointer flex items-center gap-2 bg-[#171717] px-5 py-4 border-b border-1 border-[#262626] ${isOutcome ? 'text-[#DB2777]' : 'text-[#10B981]'} `}>
      {/* <Link
      to="/transactions/$id"
      params={{ id: transaction.id }}
      ></Link> */}
      {isOutcome ? <UploadIcon /> : <DownloadIcon />}

      <span className="flex-2">{amount}</span>

      {!deletedAt ? (
        <Button
          onClick={(e) => {
            e.stopPropagation()
            remove(id)
          }}
          className="bg-[#2B1921] p-2 rounded-md cursor-pointer"
        >
          <TrashIcon className='size-5 text-[#DB2777]' />
        </Button>
      ): (
        <Button
          onClick={(e) => {
            e.stopPropagation()
            restore(id)
          }}
          className="bg-[#171717] hover:bg-[#262626] transition-all border-1 border-[#262626] p-2 rounded-full text-[#FAFAFA] text-sm px-3.5 py-1.5 cursor-pointer"
        >Restaurar</Button>
      )}
    </li>
  )
}

export default TransactionItem
