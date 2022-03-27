import { Button, Flex, Stack } from "@chakra-ui/react";
import { Input } from "../components/Form/Input";

export default function SignIn() {
  return (
    <Flex 
      w="100vw" 
      h="100vh" 
      align="center" 
      justify="center"
    >
      {/* por padrão todo flex é uma div, se quiser outra tag precisa redefinir */}
      {/* p="8" 2rem / 32px */}
      {/* saber qual num usar padding, pegar num e multiplicar por 4 pra pegar em px ou multiplica por dois pra pegar em rem */}
      <Flex
        as="form" 
        w="100%" maxWidth={360} 
        bg="gray.800" 
        p="8" 
        borderRadius={8}
        flexDir="column"
      >
        {/* stack -> colocar por volta el que precisam espaçamento */}
        <Stack spacing="4">
          <Input name="email" label="E-mail" />
          <Input name="password" label="Senha" />
        </Stack>

        <Button
          type="submit" 
          mt="4"
          colorScheme="pink"
          size="lg"
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  )
}
