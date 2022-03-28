import { Button } from "@chakra-ui/react"

interface PaginationItemProps {
  isCurrente?: boolean
  number: number
}
export function PaginationItem ({ isCurrente = false, number }: PaginationItemProps) {
 return isCurrente ? (
  <Button
    size="sm"
    fontSize="xs"
    width="4"
    colorScheme="pink"
    disabled
    _disabled={{ bg: 'pink.500', cursor: 'default' }}
  >
    {number}
  </Button>
 ) : (
  <Button
    size="sm"
    fontSize="xs"
    width="4"
    colorScheme="pink"
    bg="gray.700"
    _hover={{ bg: 'gray.500'}}
  >
    {number}
  </Button>
 ) 
}