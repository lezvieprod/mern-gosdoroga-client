import { Box } from '@chakra-ui/layout';
import React from 'react';
import { Nav } from '../../components/Nav/Nav';
import { NavSecondary } from '../../components/Nav/NavSecondary';

export const NavContainer: React.FC = () => {
  return (
    <Box flex={'0 0 auto'} h={'115px'}>
      <NavSecondary />
      <Nav />
    </Box>
  )
}


