import { TokensIcon, DownloadIcon, UploadIcon, TrashIcon } from '@radix-ui/react-icons'
import Container from '../Container';

import FilterButton from './FilterButton';

const Filter = () => {

  const filterOptions = [
    {
      icon: <TokensIcon color="white" className='size-4.5' />,
      label: 'Todos',
      action: () => {}
    },
    {
      icon: <DownloadIcon color="white" className='size-4.5' />,
      label: 'Entradas',
      action: () => {}
    },
    {
      icon: <UploadIcon color="white" className='size-4.5' />,
      label: 'Saídas',
      action: () => {}
    },
    {
      icon: <TrashIcon color="white" className='size-4.5' />,
      label: 'Excluídos',
      action: () => {}
    }
  ];

  return (
    <Container className='flex items-center'>
      {filterOptions.map((option, index) => (
        <FilterButton
          key={index}
          className={`${index >= filterOptions.length-1 && "ml-auto"}`}
          icon={option.icon}
          label={option.label}
          action={option.action}
        />
      ))}
{/*       
      <Button className={`${styles.Button} flex gap-1.5`}> 
        <TokensIcon color="white" className='size-4.5' />
        <span className="text-white text-sm">Todos</span>
      </Button>

      <Button className={`${styles.Button} flex gap-1.5`}> 
        <DownloadIcon color="white" className='size-4.5' />
        <span className="text-white text-sm">Entradas</span>
      </Button>

      <Button className={`${styles.Button} flex gap-1.5`}> 
        <UploadIcon color="white" className='size-4.5' />
        <span className="text-white text-sm">Saídas</span>
      </Button>

      <div className='flex-2 flex justify-end'>
        <Button className={`${styles.Button} flex gap-1.5`}> 
          <TrashIcon color="white" className='size-4.5' />
          <span className="text-white text-sm">Saídas</span>
        </Button>
      </div> */}
    </Container>
  )
}

export default Filter;
