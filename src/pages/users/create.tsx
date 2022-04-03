import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { useForm, SubmitHandler } from 'react-hook-form'
import * as y from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { Input } from "../../components/Form/Input";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

import { useMutation } from 'react-query'
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";
import { useRouter } from "next/router";

type CreateUserFormData = {
  name: string
  email: string
  password: string
  password_confirmation: string
}

const createUserFormSchema = y.object().shape({
  name: y.string().required('Nome obrigatório'),
  email: y.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: y.string().required('Senha obrigatória').min(6, 'No mínimo 6 caracteres'),
  password_confimation: y.string().oneOf([
    // referenciando password
    null, y.ref('password')
  ], 'As senhas precisam ser iguais')
})

function CreateUser() {
  const router = useRouter()
  // const createUser = useMutation(funca_que_vai_executar)
  const createUser = useMutation(async (user: CreateUserFormData) => {
    const { data } = await api.post('users', {
      user: {
        ...user,
        created_at: new Date()
      }
    })

    return data
  }, {
    onSuccess: () => {
      // queryClient.invalidateQueries(['users', 1]) //  invalida so a primeira pag
      queryClient.invalidateQueries('users')
    }
  })  

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values, event) => {
    await createUser.mutateAsync(values)
    router.push('/users')
  }

  const { register, handleSubmit, formState} = useForm({
    resolver: yupResolver(createUserFormSchema),
    mode: 'onChange'
  })
  const { errors } = formState

  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box 
          as="form" 
          flex="1" 
          borderRadius={8} 
          bg="gray.800" 
          p={["6", "8"]}
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading size="lg" fontWeight="normal">Criar usuários</Heading>
          <Divider my="6" borderColor="gray.700" />

          <VStack
            spacing={["6", "8"]}
          >
            <SimpleGrid
              minChildWidth="240px"
              spacing={["6", "8"]}
              w="100%"
            >
              <Input
                error={errors.name}
                name="name" label="Nome completo" 
                {...register('name')}
              />
              <Input
                error={errors.email}
                name="email" type="email" label="E-mail" 
                {...register('email')}
              />
            </SimpleGrid>

            <SimpleGrid
              minChildWidth="240px"
              spacing={["6", "8"]}
              w="100%"
            >
              <Input
                error={errors.password}
                name="password" type="password" label="Senha" 
                {...register('password')}
              />
              <Input
                error={errors.password_confimation}
                name="password_confimation" type="password" label="Confirmação da senha" 
                {...register('password_confimation')}
              />
            </SimpleGrid>

          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button colorScheme="whiteAlpha">Cancelar</Button>
              </Link>
              <Button isLoading={formState.isSubmitting} type="submit" colorScheme="pink">Salvar</Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}

export default CreateUser