import { Flex } from '@chakra-ui/react'
import { Logo } from './Logo'
import { NotificationsNav } from './NotificationsNav'
import { Profile } from './Profile'
import { SearchBox } from './SearchBox'
function Header() {
  return (
    <Flex 
      w="100%" 
      maxWidth={1480}
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
    >
      {/* por padrão todo text é um <p> */}
      <Logo />

      <SearchBox />

      <Flex
        align="center"
        ml="auto"
      >
        <NotificationsNav />
        <Profile />
       
      </Flex>
    </Flex>
  )
}

export default Header