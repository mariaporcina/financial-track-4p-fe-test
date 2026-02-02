
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'

const Pagination: React.FC = () => {
  return (
    <div className='flex items-center justify-center gap-2 mt-5'>

      <span>
        <ChevronLeftIcon />
      </span>
      
      <span>1</span>
      <span>2</span>
      <span>3</span>

      <span>
        <ChevronRightIcon />
      </span>

    </div>
  )
}

export default Pagination
