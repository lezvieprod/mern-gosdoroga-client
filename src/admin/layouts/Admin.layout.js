import React from 'react'
import { Avatar, Box, Collapse, Drawer, DrawerContent, DrawerOverlay, Flex, FormControl, FormLabel, Icon, IconButton, Input, InputGroup, InputLeftElement, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList, Progress, Switch, Text, useColorMode, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { FaBell } from "react-icons/fa";
import { FiMenu, FiSearch } from "react-icons/fi";
import { Sidebar } from '../components/Sidebar/Sidebar';
import { VscChevronDown, VscWindow } from 'react-icons/vsc';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/auth.hook';
import { Navbar } from '../components/Navbar/Navbar';
import { useSelector } from 'react-redux';

export function AdminLayout({ children }) {
  const sidebar = useDisclosure();
  const {isFetching} = useSelector(state => state.admin)

  return (
    <Box as="section" bg={useColorModeValue("#fff", "gray.700")} minH="100vh">
      <Sidebar display={{ base: "none", md: "unset" }} />
      <Drawer isOpen={sidebar.isOpen} onClose={sidebar.onClose} placement="left">
        <DrawerOverlay />
        <DrawerContent>
          <Sidebar w="full" borderRight="none" />
        </DrawerContent>
      </Drawer>
      <Box ml={{ base: 0, md: 60 }} transition=".3s ease">
        <Navbar sidebar={sidebar} />
        {isFetching ? <Progress size="xs" isIndeterminate /> : <Box h={'4px'}/> }
        <Box as="main" p="4">
          {children}
        </Box>
      </Box>
    </Box>
  );
}

