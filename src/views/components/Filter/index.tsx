import { TokensIcon, DownloadIcon, UploadIcon, TrashIcon } from '@radix-ui/react-icons'
import Container from '../Container';

import FilterButton from './FilterButton';

type FilterPropsType = {
  type: "income" | "outcome" | undefined | null
  deleted: boolean | undefined
  setFilter: (key: "type" | "deleted", value?: string | boolean) => void
}

const Filter = ({ type, deleted, setFilter }: FilterPropsType) => {

  const filterOptions = [
    {
      icon: <TokensIcon className='size-4.5' />,
      label: 'Todos',
      action: () => {
        setFilter('type', undefined)
        setFilter('deleted', undefined);
      }
    },
    {
      id: 'income',
      icon: <DownloadIcon className='size-4.5' />,
      label: 'Entradas',
      action: () => {
        setFilter('type', 'income')
        setFilter('deleted', undefined);
      }
    },
    {
      id: 'outcome',
      icon: <UploadIcon className='size-4.5' />,
      label: 'Saídas',
      action: () => {
        setFilter('type', 'outcome')
        setFilter('deleted', undefined);
      }
    },
  ];

  return (
    <Container className='flex items-center'>
      {filterOptions.map((option, index) => (
        <FilterButton
          key={index}
          className={`${type === option.id && !deleted ? "text-[#C0E952]" : ""}`}
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
          setFilter('type', undefined)
          setFilter('deleted', true)
        }}
      />
    </Container>
  )
}

export default Filter;
