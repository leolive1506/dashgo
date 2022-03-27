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