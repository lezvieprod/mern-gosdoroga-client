import { Box, UseDisclosureProps, Flex, Icon, IconButton, Input, InputGroup, InputLeftElement, Menu, MenuButton, MenuItem, MenuList, Switch, useColorMode, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { FiMenu, FiSearch } from 'react-icons/fi';
import { VscChevronDown, VscWindow } from 'react-icons/vsc';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../hooks/auth.hook';

interface INavbarProps {
  sidebar: UseDisclosureProps
}


export const Navbar: React.FC<INavbarProps> = ({ sidebar }) => {

  const { colorMode, toggleColorMode } = useColorMode()
  const { logout, userLogin } = useAuth()

  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      w="full"
      px="4"
      bg={useColorModeValue("#FCFCFC", "gray.800")}
      borderBottomWidth="1px"
      borderColor={useColorModeValue("inherit", "gray.700")}
      h="14"
    >
      <IconButton
        aria-label="Menu"
        display={{ base: "inline-flex", md: "none" }}
        onClick={sidebar.onOpen}
        icon={<FiMenu />}
        size="sm"
      />
      <InputGroup w="96" display={{ base: "none", md: "flex" }}>
        <InputLeftElement
          color="gray.500"
          children={<FiSearch />}
        />

        <Input placeholder="Search for articles..." />
      </InputGroup>
      <Flex align="center">
        <Flex align="center" as={Link} to={'/'} mr={6}>
          <Icon as={VscWindow} boxSize="5" />
        </Flex>
        <Switch size="md" mr={4} onChange={toggleColorMode} isChecked={colorMode === 'dark'} />
        <Menu placement={'bottom-end'}>
          <MenuButton
            as={Box}
            sx={{ "span": { display: "flex", alignItems: 'center' } }}
            cursor={'pointer'} px={'0.5rem'} d={'flex'} h={'100%'} alignItems={'center'}
          >
            {userLogin} <Icon as={VscChevronDown} ml={2} />
          </MenuButton>
          <MenuList>
            <MenuItem as={Link} to={'/'}>Вернуться на главную</MenuItem>
            <MenuItem onClick={logout}>Выйти из аккаунта</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
}
