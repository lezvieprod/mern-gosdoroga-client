import { Box, Container } from '@chakra-ui/react';
import React, { Suspense } from 'react';
import { Preloader } from '../components/common/Preloader';
import { Footer } from '../components/Footer/Footer';
import { Nav } from '../components/Nav/Nav';
import { NavSecondary } from '../components/Nav/NavSecondary';

interface IMainLayoutProps {
  children: React.ReactNode
}

export const MainLayout: React.FC<IMainLayoutProps> = ({ children }) => {
  return (
    <>
      <Box flex={'0 0 auto'} h={'115px'}>
        <NavSecondary />
        <Nav />
      </Box>
      <Suspense fallback={<Preloader forInit />}>
        <Container flex={'1 0 auto'} my={12}>{children}</Container>
      </Suspense>
      <Box flex={'0 0 auto'}>
        <Footer />
      </Box>
    </>
  );
}

