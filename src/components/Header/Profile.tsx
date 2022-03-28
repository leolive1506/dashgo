import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

export function Profile() {
  return (
    <Flex
      align="center"
    >
      {/* box -> div sem estilização */}
      <Box mr="4" textAlign="right">
        <Text>Leonardo Lopes</Text>
        <Text color="gray.300">leonardolivelopes2@gmail.com</Text>
      </Box>

      {/* avatar do chakra ui, quando não tem src pega name como referencia, quando tem ele carrega a foto */}
      <Avatar size="md" name="Leonardo Lopes" />
    </Flex>
  )
}
