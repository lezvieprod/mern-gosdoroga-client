import { Container } from '@chakra-ui/react';
import React from 'react';
import { NavContainer } from '../containers/Nav/NavContainer';

interface IMainLayoutProps {
  children: React.ReactNode
}

export const MainLayout: React.FC<IMainLayoutProps> = ({ children }) => {
  return (
    <>
      <NavContainer />
      <Container>{children}</Container>
    </>
  );
}

