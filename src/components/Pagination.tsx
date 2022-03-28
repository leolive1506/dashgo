import { Box, Button, Stack } from "@chakra-ui/react"

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
        <Button
          size="sm"
          fontSize="xs"
          width="4"
          colorScheme="pink"
          disabled
          _disabled={{ bg: 'pink.500', cursor: 'default' }}
        >
          1
        </Button>
        <Button
          size="sm"
          fontSize="xs"
          width="4"
          colorScheme="pink"
          bg="gray.700"
          _hover={{ bg: 'gray.500'}}
        >
          2
        </Button>
        <Button
          size="sm"
          fontSize="xs"
          width="4"
          colorScheme="pink"
          bg="gray.700"
          _hover={{ bg: 'gray.500'}}
        >
          3
        </Button>
      </Stack>
    </Stack>
  )
}

export default Pagination