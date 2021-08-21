import { Container, Heading, Icon, Text } from '@chakra-ui/react';
import React from 'react';
import { VscRocket } from 'react-icons/vsc';
import { Link } from 'react-router-dom';
import { useLang } from '../hooks/lang.hook';

export const AuthLayout = ({ children }) => {
  const { renderText, lang } = useLang()
  return (
    <>
      <Container mt={10} p={0}>
        <Heading as="h2" size="lg" mb={8} d={'flex'} justifyContent={'center'} alignItems={'center'} >
          {renderText(lang).COMMON.LOGO} <Icon as={VscRocket} ml={2} />
        </Heading>
        {children}
        <Text size="sm" mt={8} d={'flex'} justifyContent={'center'} alignItems={'center'} color={'blue.600'} >
          <Link to={'/'}> Назад на главную </Link>
        </Text>
      </Container>
    </>
  );
}

