import { Flex } from "@chakra-ui/react"
import Header from "../components/Header/Header"
import Sidebar from "../components/Sidebar"

function Dashboad() {
  return (
    <Flex direction="column" h="100vh">
      <Header /> 
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />
      </Flex>  
    </Flex>
  )
}

export default Dashboad