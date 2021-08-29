import React from 'react';
import { Nav } from '../../components/Nav/Nav';
import { NavSecondary } from '../../components/Nav/NavSecondary';

export const NavContainer: React.FC = () => {
  return (
    <>
      <NavSecondary />
      <Nav />
    </>
  )
}


