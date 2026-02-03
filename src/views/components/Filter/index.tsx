import { TokensIcon, DownloadIcon, UploadIcon, TrashIcon } from '@radix-ui/react-icons'
import Container from '../Container';

import FilterButton from './FilterButton';
import type { Dispatch, SetStateAction } from 'react';

type FilterPropsType = {
  type: "income" | "outcome" | undefined | null
  setType: Dispatch<SetStateAction<"income" | "outcome" | undefined | null>>
  deleted: boolean
  setDeleted: Dispatch<SetStateAction<boolean>>
}

const Filter = ({ type, setType, deleted, setDeleted }: FilterPropsType) => {

  const filterOptions = [
    {
      icon: <TokensIcon className='size-4.5' />,
      label: 'Todos',
      action: () => {
        setType(undefined);
        setDeleted(false)
      }
    },
    {
      id: 'income',
      icon: <DownloadIcon className='size-4.5' />,
      label: 'Entradas',
      action: () => {
        setType('income');
        setDeleted(false)
      }
    },
    {
      id: 'outcome',
      icon: <UploadIcon className='size-4.5' />,
      label: 'Saídas',
      action: () => {
        setType('outcome');
        setDeleted(false)
      }
    },
  ];

  return (
    <Container className='flex items-center'>
      {filterOptions.map((option, index) => (
        <FilterButton
          key={index}
          className={`
            ${type === option.id ? "text-[#C0E952]" : ""}
          `}
          icon={option.icon}
          label={option.label}
          action={option.action}
        />
      ))}

      <FilterButton
        className={`ml-auto ${deleted ? "text-[#C0E952]" : ""}`}
        icon={<TrashIcon className='size-4.5' />}
        label={"Excluídos"}
        action={() => {
          setType(null)
          setDeleted(true)
        }}
      />
    </Container>
  )
}

export default Filter;
