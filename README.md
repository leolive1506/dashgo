# Chakra UI
- Construida em cima emotion (parecido com styled components)

## Configuraçao Chakra UI
- Instalação
```sh
yarn add @chakra-ui/react @chakra-ui/core  @emotion/react @emotion/styled framer-motion
```
- Criar dentro de styles um theme.ts
    - theme -> thema do chakra
        - Definir quais as cores que usam no app e coisas do tipo
- Dentro theme
```ts
import { extendTheme } from '@chakra-ui/react'
import { generateKey } from 'crypto'

// herdado oq tem no chakra ui e substituindo alguns
// colocar as config necessárias
import { extendTheme } from '@chakra-ui/react'
import { generateKey } from 'crypto'

// herdado oq tem no chakra ui e substituindo alguns
export const theme = extendTheme({
    color: {
        // quais cores substituir
        gray: {
            "900": '#181B23',
            "800": '#1F2029',
        }
    },
    fonts: {
        // body -> todos os textos
        // heading -> cabeçalhos (h1, h2, h3...)
        // mono -> codigo, dentro tag pre
        heading: 'Roboto',
        body: 'Roboto'
    },
    styles: {
        global: {
            body: {
                // pegando gray-900 que ta na docs
                bg: 'gray.900',
                color: 'gray.50'
            }
        }
    }
})
```
- No app
```tsx
import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../styles/theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // passando theme pro app
    // resetCSS -> resetar css padrão
    // true por padrão (não precisa colocar)
    <ChakraProvider resetCSS theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
```

# [Responsividade chakra ui](https://chakra-ui.com/docs/styled-system/features/responsive-styles)
- Breakpoint 
```ts
const breakpoints = {
  sm: '30em',
  md: '48em',
  lg: '62em',
  xl: '80em',
  '2xl': '96em',
}
```
- Ex fazendo na order dos breakpoints (sm, md, lg)
```tsx
// sm -> 2xl dps disso 3xl
// pode fazer outras medias query
<Text fontSize={["2xl", "3xl"]} fontWeight="bold" letterSpacing="tight" w="64"></Text>
```
- Ex sem seguir escolhendo breakpoints
```tsx
<Text fontSize={{ base: '24px', md: '40px', lg: '56px' }}>
  This is responsive text
</Text>
```

- useBreakopintValue
  - Cria valor baseador se está em uma medida ou não
```tsx
import { useBreakpointValue } from '@chakra-ui/react'

function Example() {
  const variant = useBreakpointValue({ base: 'outline', md: 'solid' })
}

  return (
      <Button colorScheme='teal' variant={variant}>
        Button
      </Button>
  )
```

- useMediaQuery
  - Cria valor baseador se está em uma medida ou não
```tsx
function Example() {
  const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)')

  return (
    <Text>
      {isLargerThan1280 ? 'larger than 1280px' : 'smaller than 1280px'}
    </Text>
  )
}
```

# Criar um sidebar resonponsivo
- useSidebarDrawer
```tsx
import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ReactNode, createContext, useContext, useEffect } from "react";

interface SidebarDrawerProviderProps {
  children: ReactNode
}
type SidebarDrawerContextData =  UseDisclosureReturn

const SidebarDrawerContext = createContext({} as SidebarDrawerContextData)

export function SidebarDrawerProvider({ children }: SidebarDrawerProviderProps) {
  const disclosure = useDisclosure()
  const router = useRouter()

  // fechar sidebar quando clica em algum link
  useEffect(() => {
    disclosure.onClose()
  }, [router.asPath])

  return (
    <SidebarDrawerContext.Provider value={disclosure}>
      {children}
    </SidebarDrawerContext.Provider>
  )
}

export const useSidebarDrawer = () => useContext(SidebarDrawerContext)
```

- Componente sidebar
```tsx
import { Box, Drawer, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerBody, DrawerOverlay, useBreakpointValue } from "@chakra-ui/react"
import { useSidebarDrawer } from "../../contexts/SidebarDrawerContext"
import { SidebarNav } from "./SidebarNav"

function Sidebar() {
  const { isOpen, onClose } = useSidebarDrawer()

  const isDrawerSideBar = useBreakpointValue({
    base: true,
    lg: false
  })

  if(isDrawerSideBar) {
    // placement -> lado
    return (
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent bg="gray.800" p="4">
            <DrawerCloseButton mt="6" />
            <DrawerHeader>Navegação</DrawerHeader>

            <DrawerBody>
              <SidebarNav />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    )
  }
  return (
    <Box as="aside" w="64" mr="8"> 
      // items pra navegar
      <SidebarNav />
    </Box>    
  )
}

export default Sidebar
```

- Componente header (pra abri o sidebar)
```tsx
function Header() {
  const { onOpen } = useSidebarDrawer()

  return (
    <>
      { !isWideVersion && (
          <IconButton
            aria-label="Open navigation"
            icon={<Icon as={RiMenuLine} />}
            fontSize="24"
            variant="unstyled"
            onClick={onOpen}
            mr="2"
          >
          </IconButton>
      )}
    </>
  )
}
```
# Gráficos
- Usando no app [Apexcharts](https://apexcharts.com/)
```sh
yarn add apexcharts react-apexcharts
```

- apexcharts
  - Pode gerar erro 'window is not defined'
  - Pq next faz carregamento no servidor next, la não tem window
  - Fazer ele rodar somente no browser
  ```ts
  import dynamic from "next/dynamic"
  // import Chart from 'react-apexcharts'

  const Chart = dynamic(() => import('react-apexcharts'), {
    // Chart é so recarregaod pelo lado do browser
    ssr: false
  })
  ```

- Usar
```tsx
import { theme } from "@chakra-ui/react"
import dynamic from "next/dynamic"

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false
})

// opcionamal, apenas pra estilo
const options = {
  chart: {
    // remover menu de cima
    toolbar: {
      show: false
    },
    zoom: {
      enabled: false
    },
    // cor texto dos numero
    // theme de dentro @chakra-ui/react
    foreColor: theme.colors.gray[500]
  }
}
// dados
const series = [
  // como quer um tipo de dado, coloca apenas uma informação
  { name: 'series1', data: [31, 120, 10, 28, 61, 18, 109]}
]

// no componente
<Chart type="area" height={160} options={options} series={series} />
```

# Dicas gerais
- Tipar um elemento
```tsx
import { Icon, Link, Text } from "@chakra-ui/react";
import { ElementType } from "react";

interface NavLinkProps {
  // ElementType -> quando passa o nome do componente e não a declaração dele
  icon: ElementType
  children: string
}
export function NavLink({ icon, children }: NavLinkProps) {
  return (
    <Link display="flex" alignItems="center" color="pink.400">
      <Icon as={ icon } fontSize="20"/>
      <Text ml="4" fontWeight="medium">{children}</Text>
    </Link>
  )
}
```

# Link
- Quando passar um el sem ser o <a>, não mostra visualmente a rota no browser
  - Passar propriedade passHref
```tsx
<Link href={href} passHref></Link>
```