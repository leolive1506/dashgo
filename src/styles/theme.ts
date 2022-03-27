import { extendTheme } from '@chakra-ui/react'
import { generateKey } from 'crypto'

// herdado oq tem no chakra ui e substituindo alguns
export const theme = extendTheme({
    color: {
        gray: {
            "900": '#181B23',
            "800": '#1F2029',
            "700": '#353646',
            "600": '#4B4D63',
            "500": '#616480',
            "400": '#797D9A',
            "300": '#9699B0',
            "100": '#D1D2DC',
            "50": '#EEEEF2',
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
                bg: 'gray.900',
                color: 'gray.50'
            }
        }
    }
})