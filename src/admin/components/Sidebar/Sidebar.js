import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { FaClipboardCheck, FaRss } from 'react-icons/fa';
import { HiCollection } from 'react-icons/hi';
import { MdHome } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { SidebarItem } from './SidebarItem';

export const Sidebar = (props) => {
  return (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      zIndex="sticky"
      h="full"
      pb="10"
      overflowX="hidden"
      overflowY="auto"
      bg={useColorModeValue("#F9F9F9", "gray.800")}
      borderColor={useColorModeValue("inherit", "gray.700")}
      borderRightWidth="1px"
      w="60"
      {...props}
    >
      <Flex px="4" py="5" align="center">
        <Text
          fontSize="2xl"
          ml="2"
          color={useColorModeValue("brand.500", "white")}
          fontWeight="semibold"
        >
          Admin Panel
        </Text>
      </Flex>
      <Flex
        direction="column"
        as="nav"
        fontSize="15px"
        color="gray.600"
        aria-label="Main Navigation"
        px={2}
      >
        <SidebarItem as={Link} to={'/admin'} icon={MdHome}>Главная</SidebarItem>
        <SidebarItem as={Link} to={'/admin/posts'} icon={FaRss}>Посты</SidebarItem>
        <SidebarItem as={Link} to={'/admin/users'} icon={HiCollection}>Пользователи</SidebarItem>
        <SidebarItem icon={FaClipboardCheck}>Уведомления</SidebarItem>

      </Flex>
    </Box>
  );
}

  ;
