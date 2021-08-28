import { Container, Heading, Icon, Text } from '@chakra-ui/react';
import React from 'react';
import { Suspense } from 'react';
import { VscRocket } from 'react-icons/vsc';
import { Link } from 'react-router-dom';
import { Preloader } from '../components/common/Preloader';
import { useLang } from '../hooks/lang.hook';

interface IAuthLayoutProps {
  children: React.ReactNode
}

export const AuthLayout: React.FC<IAuthLayoutProps> = ({ children }) => {

  const { renderText, lang } = useLang()

  return (
    <Suspense fallback={<Preloader forInit />}>
      <Container mt={10} p={0}>
        <Heading as="h2" size="lg" mb={8} d={'flex'} justifyContent={'center'} alignItems={'center'} >
          {renderText(lang).COMMON.LOGO} <Icon as={VscRocket} ml={2} />
        </Heading>
        {children}
        <Text size="sm" mt={8} d={'flex'} justifyContent={'center'} alignItems={'center'} color={'blue.600'} >
          <Link to={'/'}> Назад на главную </Link>
        </Text>
      </Container>
    </Suspense>
  );
}

