import { Box, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import React from 'react';

export const CMenu = ({ menuButton, menuItems, ...props }) => {
  return (
    <Menu {...props}>
      {menuButton}
      <MenuList>
        {menuItems}
      </MenuList>
    </Menu>
  );
}

