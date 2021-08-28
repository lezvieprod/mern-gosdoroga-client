import { Box, chakra, Container, Heading, HStack, Icon, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import React, { ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/auth.hook';
import { useLang } from '../../hooks/lang.hook';
import { AppSettings } from '../Modals/AppSettings/AppSettings';
import { VscChevronDown, VscGlobe, VscRocket } from "react-icons/vsc";

const RouteLink = chakra(Link)

export const Nav: React.FC = () => {

  const { logout, isAuthenticated, userLogin, accessLevel } = useAuth()
  const { lang, renderText, setNewLang } = useLang()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleOnSwitch = (e: ChangeEvent<HTMLInputElement>) => e.target.checked ? setNewLang('EN') : setNewLang('RU')

  return (
    <Box h={'65px'} bg={useColorModeValue("#FCFCFC", "gray.900")} boxShadow="base">
      <Container maxW={'1200px'} h={'100%'}>
        <Box d={'flex'} justifyContent={'space-between'} h={'100%'}>
          <Heading as="h2" size="md">
            <RouteLink to={'/'} px={'0.5rem'} d={'flex'} h={'100%'} alignItems={'center'}>
              {renderText(lang).COMMON.LOGO} <Icon as={VscRocket} ml={2} />
            </RouteLink>
          </Heading>
          <Box d={'flex'}>
            <HStack spacing="14px">
              <RouteLink to={'/posts'} px={'0.5rem'} d={'flex'} h={'100%'} alignItems={'center'}>
                {renderText(lang).NAV.POSTS}
              </RouteLink>
              {
                !isAuthenticated
                  ? <RouteLink to={'/auth/login'} px={'0.5rem'} d={'flex'} h={'100%'} alignItems={'center'}>
                    {renderText(lang).NAV.SIGN_IN}
                  </RouteLink>
                  : <Menu placement={'bottom-end'}>
                    <MenuButton
                      as={Box}
                      sx={{
                        "span": {
                          display: "flex",
                          alignItems: 'center'
                        },
                      }}
                      cursor={'pointer'} px={'0.5rem'} d={'flex'} h={'100%'} alignItems={'center'}
                    >
                      {userLogin} <Icon as={VscChevronDown} ml={2} />
                    </MenuButton>
                    <MenuList>
                      {
                        accessLevel === 5 &&
                        <>
                          <MenuGroup title={`Уровень доступа ${accessLevel}`}>
                            <MenuItem as={Link} to={'/admin'}>Управление приложением</MenuItem>
                            <MenuItem>Создать уведомление</MenuItem>
                          </MenuGroup>
                          <MenuDivider />
                        </>
                      }
                      <MenuItem disabled>Профиль</MenuItem>
                      <MenuItem onClick={logout}>Выйти из аккаунта</MenuItem>
                    </MenuList>
                  </Menu>

                // <Button onClick={logout} px={'0.5rem'} d={'flex'} _hover={{ bgColor: '#f4f4f4' }} h={'100%'} alignItems={'center'}>
                //   ({userLogin}) logout
                // </Button>
              }
              <Box onClick={onOpen} cursor={'pointer'} px={'0.5rem'} h={'100%'} d={'flex'} alignItems={'center'}>
                <Box>
                  <Icon as={VscGlobe} w={5} h={5} />
                </Box>
                <AppSettings isOpen={isOpen} onClose={onClose} handleOnSwitch={handleOnSwitch} />
              </Box>
            </HStack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}


