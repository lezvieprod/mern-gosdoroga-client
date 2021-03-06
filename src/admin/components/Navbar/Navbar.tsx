import { Box, UseDisclosureProps, Flex, Icon, IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import React from 'react';
import { FiMenu } from 'react-icons/fi';
import { VscChevronDown, VscWindow } from 'react-icons/vsc';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../hooks/auth.hook';
import { useLang } from '../../../hooks/lang.hook';

interface INavbarProps {
  sidebar: UseDisclosureProps
}

export const Navbar: React.FC<INavbarProps> = ({ sidebar }) => {

  const { logout, userLogin } = useAuth()
  const { lang, renderText } = useLang()

  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      w="full"
      px="4"
      bg={"#25292f"}
      borderBottomWidth="1px"
      borderColor={"#393f47"}
      h="14"
    >
      <IconButton
        aria-label="Menu"
        display={{ base: "inline-flex", lg: "none" }}
        onClick={sidebar.onOpen}
        icon={<FiMenu />}
        size="sm"
      />

      <Flex align="center" ml={'auto'}>
        <Flex align="center" as={Link} to={'/'} mr={6}>
          <Icon as={VscWindow} boxSize="5" />
        </Flex>
        <Menu placement={'bottom-end'}>
          <MenuButton
            as={Box}
            sx={{ "span": { display: "flex", alignItems: 'center' } }}
            cursor={'pointer'} px={'0.5rem'} d={'flex'} h={'100%'} alignItems={'center'}
            color="#EEF4FF"
          >
            {userLogin} <Icon as={VscChevronDown} ml={2} />
          </MenuButton>
          <MenuList>
            <MenuItem as={Link} to={'/'}>{renderText(lang).BACK_TO_MAIN}</MenuItem>
            <MenuItem onClick={logout}>{renderText(lang).LOGOUT}</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
}
