import { Container } from '@chakra-ui/react';
import React, { Suspense } from 'react';
import { Preloader } from '../components/common/Preloader';
import { NavContainer } from '../containers/Nav/NavContainer';

interface IMainLayoutProps {
  children: React.ReactNode
}

export const MainLayout: React.FC<IMainLayoutProps> = ({ children }) => {
  return (
    <>
      <NavContainer />
      <Suspense fallback={<Preloader forInit />}>
        <Container my={8}>{children}</Container>
      </Suspense>
    </>
  );
}

