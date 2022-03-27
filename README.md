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