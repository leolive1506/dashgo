import { Flex, useBreakpointValue } from '@chakra-ui/react'
import { Logo } from './Logo'
import { NotificationsNav } from './NotificationsNav'
import { Profile } from './Profile'
import { SearchBox } from './SearchBox'

function Header() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })
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

      { isWideVersion && <SearchBox /> }

      <Flex
        align="center"
        ml="auto"
      >
        <NotificationsNav />

        <Profile showProfileData={isWideVersion} />
      </Flex>
    </Flex>
  )
}

export default Header