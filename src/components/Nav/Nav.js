import { Box, Button, chakra, Container, Heading, HStack, Switch, useDisclosure } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/auth.hook';
import { useLang } from '../../hooks/lang.hook';
import { AppSettings } from '../Modals/AppSettings/AppSettings';

const RouteLink = chakra(Link)

export const Nav = () => {

  const { logout, isAuthenticated } = useAuth()
  const { lang, renderText, setNewLang } = useLang()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleOnSwitch = (e) => e.target.checked ? setNewLang('EN') : setNewLang('RU')


  return (
    <Box h={'65px'} bgColor={'white'} boxShadow="base">
      <Container maxW={'1200px'} h={'100%'}>
        <Box d={'flex'} justifyContent={'space-between'} h={'100%'}>
          <Heading as="h2" size="lg">
            <RouteLink to={'/'} px={'0.5rem'} d={'flex'} _hover={{ bgColor: '#f4f4f4' }} h={'100%'} alignItems={'center'}>
              {renderText(lang).COMMON.LOGO}
            </RouteLink>
          </Heading>
          <Box d={'flex'}>
            <HStack spacing="14px">
              <RouteLink to={'/claims'} px={'0.5rem'} d={'flex'} _hover={{ bgColor: '#f4f4f4' }} h={'100%'} alignItems={'center'}>
                {renderText(lang).NAV.CLAIM}
              </RouteLink>
              {!isAuthenticated
                ? <RouteLink to={'/auth/login'} px={'0.5rem'} d={'flex'} _hover={{ bgColor: '#f4f4f4' }} h={'100%'} alignItems={'center'}>
                  {renderText(lang).NAV.SIGN_IN}
                </RouteLink>
                : <Button onClick={logout} px={'0.5rem'} d={'flex'} _hover={{ bgColor: '#f4f4f4' }} h={'100%'} alignItems={'center'}>
                  logout
                </Button>
              }

              <Box onClick={onOpen} cursor={'pointer'} px={'0.5rem'} _hover={{ bgColor: '#f4f4f4' }} h={'100%'} d={'flex'} alignItems={'center'}>
                <Box>
                  Н
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


