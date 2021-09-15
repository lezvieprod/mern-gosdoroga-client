import { Box, Container, Heading, HStack, Icon, Image, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/auth.hook';
import { useLang } from '../../hooks/lang.hook';
import { VscChevronDown, VscRocket } from "react-icons/vsc";
import { NavButton } from '../common/custom/NavButton';

export const Nav: React.FC = () => {

  const { logout, isAuthenticated, userLogin, accessLevel, userPhoto } = useAuth()
  const { lang, renderText } = useLang()

  return (
    <Box maxH={'70px'} h={'100%'} bg={"#FCFCFC"} boxShadow="sm">
      <Container h={'100%'}>
        <Box d={'flex'} justifyContent={'space-between'} h={'100%'}>
          <Heading as="h2" size="md">
            <NavButton as={Link} to={'/'} >
              {renderText(lang).COMMON.LOGO} <Icon as={VscRocket} ml={2} />
            </NavButton>
          </Heading>
          <Box d={'flex'}>
            <HStack spacing="14px">
              <NavButton as={Link} to={'/createpost'} >
                {renderText(lang).NAV.CREATE_POSTS}
              </NavButton>
              {
                !isAuthenticated
                  ? <NavButton as={Link} to={'/auth/login'}>
                    {renderText(lang).NAV.SIGN_IN}
                  </NavButton>
                  : <Menu placement={'bottom-end'}>
                    <NavButton
                      as={MenuButton}
                      sx={{
                        "span": {
                          display: "flex",
                          alignItems: 'center'
                        },
                      }}
                      cursor={'pointer'} px={'0.5rem'} d={'flex'} h={'100%'} alignItems={'center'}
                    >
                      {userPhoto && <Image src={userPhoto} boxSize={8} objectFit={'cover'} alt={''} borderRadius={'50px'} mr={2} />}
                      {userLogin} <Icon as={VscChevronDown} ml={2} />
                    </NavButton>
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
                      <MenuItem as={Link} to={'/profile/' + userLogin}>Профиль</MenuItem>
                      <MenuItem onClick={logout}>Выйти из аккаунта</MenuItem>
                    </MenuList>
                  </Menu>
              }
            </HStack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}


