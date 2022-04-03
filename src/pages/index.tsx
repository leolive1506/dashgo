import { Button, Flex, Stack } from "@chakra-ui/react";
import { useForm, SubmitHandler } from 'react-hook-form'
import * as y from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Input } from "../components/Form/Input";

type SignInFormData = {
  email: string
  password: string
}

const signFormSchema = y.object().shape({
  email: y.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: y.string().required('Senha obrigatória')
})

export default function SignIn() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signFormSchema),
    mode: 'onChange'
  })
  const { errors } = formState

  console.log(errors)
  const handleSignIn: SubmitHandler<SignInFormData> = async (values, event) => {
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log(values)
  }
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
        onSubmit={ handleSubmit(handleSignIn) }
      >
        {/* stack -> colocar por volta el que precisam espaçamento */}
        <Stack spacing="4">
          <Input 
            name="email" 
            label="E-mail"
            error={errors.email}
            {...register('email')}
          />

          <Input
            name="password" 
            type="password"
            label="Senha"
            error={errors.password}
            {...register('password')}
          />
        </Stack>

        <Button
          type="submit" 
          mt="4"
          colorScheme="pink"
          size="lg"
          isLoading={formState.isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  )
}
