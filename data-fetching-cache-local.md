# Buscar dados de um backend
  - Armazena dentro estado
    - Quando não são mais utilizados (ex: sai da pag), app não guarda resticio da req
  - Alternativa melhor
    - ## Cache local de dados
      - Ex: lista user
        - Quando ir pra 2º (outra req) pag e dps voltar pra 1º
          - Maneira tradicional
            - Faz uma nova chamada pro back pra obter provavelmente os mesmo dados
          - Com cache local de dados
            - Armazena dados das req feitas em um cache
              - Quanod precisar de novo em periodo curto de tempo
              - Salva pra mostrar de uma melhor usabilidade
                - Mostra de maneira instantenea
            - Precisa de cuidado com dados
              - Data sync
                - Quando alguma informação for alterada, alterar essa informação no cache
            - Ferramente usada no curso -> react query
              - Integração com Web e react native
              - SWR faz algo parecido



# Configurar React query
## Vem por padrão
### Stale while revalidate (Obsoleto enquanto revalida)
- mostra versão mais atual em cache
  - Revalida os dados por baixo do pano
  - Atualiza em tela enquanto ja aprenta os dados guardados em cache
- Assume que todos dados ja estão obsoletos (precisam ser atualizados assim q der foco)
- Alterar
```tsx
  const { data, isLoading, error, isFetching } = useQuery('users' , async () => {
    const response = await fetch('http://localhost:3000/api/users')
    const data = await response.json()
    return data
  }, {
    staleTime: 1000 * 5 // 5 seg
  })
```
### Foco na aba
- Quando o usuário não atualiza a tela, mas quando retorna e da um foco a ela
  - Faz uma nova req e atualiza os dados

## Estados do react query
- stale
  - Obsoleto, precisa de ir na api e buscar os dados novamente
- fetching
  - estado de carregamento
- fresh
  - dado fresco, recente, não precisa recarregar em um dado período

## Configurar React query
```sh
yarn add react-query
```
```tsx
  // const query = useQuery('nome_chava_no_cache')
const query = useQuery('users', async () => {
  const response = await fetch('http://localhost:3000/api/users')
  const data = await response.json()

  return data
})

// no app
const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // passando theme pro app
    <QueryClientProvider client={queryClient}>
      // compoenents app
    </QueryClientProvider>
  )
```

## Fazer um prefetch de um elemento
```tsx
<Link color="purple.400" onMouseEnter={() => handlePrefetchUser(Number(user.id))}>
  <Text fontWeight="bold">{user.name}</Text>
</Link>
```
```tsx
async function handlePrefetchUser(userId: number) {
  await queryClient.prefetchQuery(['user', userId], async () => {
    const response = await api.get(`users/${userId}`)
    return response.data
  }, {
    staleTime: 1000 * 60 * 10 // 10min
  })
}
```

## Mutations
- ação na api quando não é de busca (criar, alterar, deletar)
```ts
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
    // após add é preciso invalidar uma query(dados em cache)
    // queryClient.invalidateQueries(['users', 1]) //  invalida so a primeira pag
    queryClient.invalidateQueries('users')
  }
})  

const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values, event) => {
  await createUser.mutateAsync(values)
  router.push('/users')
}
```

## Integração React query + SSR
- Por padrão use query não funciona no SSR pq é um hook e roda so lado cliente
- Na query
```ts
export function useUsers(page: number, options?: UseQueryOptions) {
  return useQuery(['users', page], () => getUsers(page), {
    staleTime: 1000 * 60 * 10, // 10min
    // initialData fica dentro usequeyroption, quando passa ele e executa do lado server nextjs, a primeira reqnão aconte lado cliente
    ...options
  })
}
```
- Na pag
```tsx 
// const query = useQuery('nome_chava_no_cache', funcção que vai retornar os dados)
const { data, isLoading, error, isFetching } = useUsers(page, {
  initialData: users
})
export const getServerSideProps: GetServerSideProps = async () => {
  const { users, totalCount } = await getUsers(1)

  return { 
    props: {
      users,
      totalCount
    }
  }
}
```

## [Devtools](https://react-query.tanstack.com/devtools)
- Importa e colocar dentro do provider do react query em _app
```tsx
import { ReactQueryDevtools } from 'react-query/devtools'
```

## Sinalizar p usuários estados de carregamento
```tsx
  const { data, isLoading, error, isFetching } = useQuery('users' , async () => {
    const response = await fetch('http://localhost:3000/api/users')
    const data = await response.json()
    return data
  }, {
    staleTime: 1000 * 5 // 5 seg
  })
```
```ts
{ isLoading && <Spinner size="sm" color="gray.500" ml="4" /> } // carregamento inicial
{ !isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4" /> } // somente atualização
```

# Miragejs usando faker
- Instala mirage
- Dps
```sh
# no curso estava com problema de tipagem e teve que baixar versão específica
# yarn add faker -D
# yarn add @types/faker -D
yarn add faker@5.5.3 
yarn add @types/faker@5.5.3 -D
```