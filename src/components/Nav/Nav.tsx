import { Box, Container, Heading, HStack, Icon, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList, useColorModeValue} from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/auth.hook';
import { useLang } from '../../hooks/lang.hook';
import { VscChevronDown,VscRocket } from "react-icons/vsc";
import { NavButton } from '../common/custom/NavButton';

export const Nav: React.FC = () => {

  const { logout, isAuthenticated, userLogin, accessLevel } = useAuth()
  const { lang, renderText } = useLang()

  return (
    <Box h={'70px'} bg={useColorModeValue("#FCFCFC", "gray.900")} boxShadow="sm">
      <Container h={'100%'}>
        <Box d={'flex'} justifyContent={'space-between'} h={'100%'}>
          <Heading as="h2" size="md">
            <NavButton as={Link} to={'/'} >
              {renderText(lang).COMMON.LOGO} <Icon as={VscRocket} ml={2} />
            </NavButton>
          </Heading>
          <Box d={'flex'}>
            <HStack spacing="14px">
              <NavButton as={Link} to={'/posts'} >
                {renderText(lang).NAV.POSTS}
              </NavButton>
              {
                !isAuthenticated
                  ? <NavButton as={Link} to={'/auth/login'}>
                    {renderText(lang).NAV.SIGN_IN}
                  </NavButton>
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
              }
              {/* <Box onClick={onOpen} cursor={'pointer'} px={'0.5rem'} h={'100%'} d={'flex'} alignItems={'center'}>
               
                <AppSettings isOpen={isOpen} onClose={onClose} handleOnSwitch={handleOnSwitch} />
              </Box> */}
            </HStack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}


