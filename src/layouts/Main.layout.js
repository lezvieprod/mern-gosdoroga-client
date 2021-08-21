import { Container, LightMode } from '@chakra-ui/react';
import React from 'react';
import { NavContainer } from '../containers/Nav/NavContainer';

export const MainLayout = ({ children }) => {
  return (
    <>
      <NavContainer />
      <Container maxW={'1200px'}>{children}</Container>
    </>
  );
}

