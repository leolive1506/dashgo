import { Box, Button, Stack } from "@chakra-ui/react"
import { PaginationItem } from "./PaginationItem"

function Pagination() {
  return (
    <Stack
      direction="row"
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
        <PaginationItem number={1} isCurrente />
        <PaginationItem number={2} />
        <PaginationItem number={3} />
        <PaginationItem number={4} />
        <PaginationItem number={5} />
      </Stack>
    </Stack>
  )
}

export default Pagination