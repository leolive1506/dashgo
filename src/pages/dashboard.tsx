import { Box, Flex, SimpleGrid, Text, theme } from "@chakra-ui/react"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import dynamic from "next/dynamic"
import { ApexOptions } from "apexcharts"
import { useEffect, useState } from "react"
// import Chart from 'react-apexcharts'

const Chart = dynamic(() => import('react-apexcharts'), {
  // Chart é so recarregaod pelo lado do browser
  ssr: false
})

const options: ApexOptions = {
  chart: {
    // remover menu de cima
    toolbar: {
      show: false
    },
    zoom: {
      enabled: false
    },
    foreColor: theme.colors.gray[500]
  },
  // grid no fundo
  grid: {
    show: false
  },
  // tirar numeros em cima linha
  dataLabels: {
    enabled: false
  },
  // hover quando passa mouse em cima
  tooltip: {
    enabled: false
  },
  xaxis: {
    type: 'datetime',

    axisBorder: {
      // borda em baixo
      color: theme.colors.gray[600]
    },
    axisTicks: {
      // pontinhos na borda em baixo
      color: theme.colors.gray[600]
    },
    // datas em nos pontinhos
    categories: [
      '2021-03-18T00:00:00.000Z',
      '2021-03-19T00:00:00.000Z',
      '2021-03-20T00:00:00.000Z',
      '2021-03-21T00:00:00.000Z',
      '2021-03-22T00:00:00.000Z',
      '2021-03-23T00:00:00.000Z',
      '2021-03-24T00:00:00.000Z'
    ],
  },
  fill: {
    opacity: 0.3,
    type: 'gradient',
    gradient: {
      shade: 'dark',
      opacityFrom: 0.7,
      opacityTo: 0.3
    }

  }
}

const series = [
  // como quer um tipo de dado, coloca apenas uma informação
  { name: 'series1', data: [31, 120, 10, 28, 61, 18, 109]}
]

function Dashboad() {
  const [assembleGraphics, setAssembleGraphics] = useState(false)

  useEffect(() => {
    setAssembleGraphics(true)
  },[])
  
  return (
    <Flex direction="column" h="100vh">
      <Header /> 
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        {/* Grid simples */}
        {/* flex=1 ocupar largura que sobrar */}
        {/* quando item menor 320px, quebra linha e coloca items a baixo */}
        { assembleGraphics && (
          <SimpleGrid flex="1" gap="4" minChildWidth="320px">  
            <Box
              p={["6", "8"]}
              bg="gray.800"
              borderRadius={8}
              pb="4"
            >
              <Text fontSize="lg" mb="4">Inscritos da semana</Text>
              {/* serires dados do grafico */}
              {/* options as configs */}
              <Chart type="area" height={160} options={options} series={series} />
            </Box>
            <Box
              p={["6", "8"]}
              bg="gray.800"
              borderRadius={8}
            >
              <Text fontSize="lg" mb="4">Taxa de abertura</Text>
              <Chart type="area" height={160} options={options} series={series} />
            </Box>

          </SimpleGrid>
        )}
      </Flex>  
    </Flex>
  )
}

export default Dashboad