import { Box, Stack, Text } from "@chakra-ui/react"
import { PaginationItem } from "./PaginationItem"

interface PaginationProps {
  totalCountOfRegister: number
  registersPerPage?: number
  currentPage?: number
  onPageChange: (page: number) => void
}

const siblingsCount = 1

// 2,5
// [0, 0, 0]
//[ 2 + 0 + 1, 2 + 1 + 1, 2 + 2 + 1]
// [3, 4, 5]
function generatePagesArray(from: number, to: number) {
  // gera um array vazio
  return [...new Array(to - from)].map((_, index) => {
    return from + index + 1
  }).filter(page => page > 0)
}

function Pagination({ 
  totalCountOfRegister,
  registersPerPage = 10,
  currentPage = 1,
  onPageChange
}: PaginationProps) {
  const lastPage = Math.ceil(totalCountOfRegister / registersPerPage)
  const previosPages = currentPage > 1
    ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1 )
    : []

  const nextPages = currentPage < lastPage
    ? generatePagesArray(currentPage, Math.min(currentPage + siblingsCount, lastPage))
    : []

  return (
    <Stack
      direction={["column", "row"]}
      mt="8"
      spacing="6"
      justify="space-between"
      align="center"
    >
      {/* mostrando quantos e ototal registros  */}
      <Box>
        <strong>0</strong> - <strong>10</strong> de <strong>100</strong>
      </Box>
      <Stack direction ="row" spacing="2">
        {currentPage > (1 + siblingsCount) && (
          <>
            <PaginationItem number={1} onPageChange={onPageChange} />
            {currentPage > (2 + siblingsCount) && (
              <Text color="gray.300" width="8" textAlign="center">...</Text>
            )}
          </>
        )}

        {previosPages.length > 0 && previosPages.map(page => {
          return <PaginationItem key={page} number={page} onPageChange={onPageChange} />
        })}

        <PaginationItem number={currentPage } isCurrente onPageChange={onPageChange} />

        {nextPages.length > 0 && nextPages.map(page => {
          return <PaginationItem key={page} number={page} onPageChange={onPageChange} />
        })}

        {(currentPage + siblingsCount) < lastPage && (
          <>
            {(currentPage + 1 + siblingsCount) < lastPage && (
              <Text color="gray.300" width="8" textAlign="center">...</Text>
            )}
            <PaginationItem number={lastPage} onPageChange={onPageChange} />
          </>
        )}
        
      </Stack>
    </Stack>
  )
}

export default Pagination