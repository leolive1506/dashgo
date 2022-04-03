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
      <SidebarNav />
    </Box>    
  )
}

export default Sidebar