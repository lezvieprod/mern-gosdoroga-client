import { Box, Container, Flex, Icon, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import React from 'react'
import { VscGlobe } from 'react-icons/vsc'
import { useLang } from '../../hooks/lang.hook'
import { NavButton } from '../common/custom/NavButton'

export const NavSecondary: React.FC = () => {

  const { lang, setNewLang } = useLang()
  const handleOnSwitch = () => lang === 'RU' ? setNewLang('EN') : setNewLang('RU')

  return (
    <Box maxH={'45px'} h={'100%'} bg={'#1E3685'} boxShadow="base">
      <Container h={'100%'}>
        <Flex alignItems="center" height={'100%'} justifyContent={'flex-end'}>
          <Menu placement={'bottom-end'}>
            <NavButton as={MenuButton} color={'#fff'} _hover={{ bgColor: '#2344a4' }}>
              <Flex alignItems={'center'}>
                <Icon as={VscGlobe} w={5} h={5} mr={2} />
                {lang === '{}' ? 'RU' : lang}
              </Flex>
            </NavButton>
            <MenuList>
              <MenuItem onClick={handleOnSwitch} pointerEvents={lang === 'RU' ? 'none' : 'all'}>Russian</MenuItem>
              <MenuItem onClick={handleOnSwitch} pointerEvents={lang === 'EN' ? 'none' : 'all'}>English</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Container>
    </Box>
  )
}
