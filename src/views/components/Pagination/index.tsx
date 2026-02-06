import { useMemo } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { getPageNumbers } from '../../../utils/GetPageNumbers';

interface PaginationProps {
  currentPage: number
  totalPages: number
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages }) => {
  const navigate = useNavigate({ from: '/transactions' })
  const search = useSearch({ from: '/transactions' })

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return
    
    navigate({
      search: {
        ...search,
        page: newPage,
      },
    })
  }

  const pageNumbers = useMemo(() => getPageNumbers(currentPage, totalPages), [currentPage, totalPages])

  if (totalPages <= 1) {
    return null
  }

  return (
    <div className='flex items-center justify-center gap-2 my-5'>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`bg-[#13150E] flex items-center justify-center p-2 rounded-md transition-colors cursor-pointer border-1 border-[#262626] ${
          currentPage === 1
            ? 'text-[#737373] cursor-not-allowed'
            : 'text-[#FAFAFA] hover:bg-[#262626] cursor-pointer'
        }`}
        aria-label="Página anterior"
      >
        <ChevronLeftIcon />
      </button>
      
      {pageNumbers.map((page, index) => {
        if (page === '...') {
          return (
            <span key={`ellipsis-${index}`} className="text-[#737373] px-2">
              ...
            </span>
          )
        }

        const pageNumber = page as number
        const isActive = pageNumber === currentPage

        return (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={`px-3 py-1 rounded-md transition-colors bg-[#13150E] border-1 border-[#262626] ${
              isActive
                ? 'text-[#DAFF73]'
                : 'text-[#FAFAFA] hover:bg-[#262626] cursor-pointer'
            }`}
            aria-label={`Ir para página ${pageNumber}`}
            aria-current={isActive ? 'page' : undefined}
          >
            {pageNumber}
          </button>
        )
      })}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`flex items-center justify-center p-2 rounded-md transition-colors bg-[#13150E] border-1 border-[#262626] ${
          currentPage === totalPages
            ? 'text-[#737373] cursor-not-allowed'
            : 'text-[#FAFAFA] hover:bg-[#262626] cursor-pointer'
        }`}
        aria-label="Próxima página"
      >
        <ChevronRightIcon />
      </button>
    </div>
  )
}

export default Pagination
