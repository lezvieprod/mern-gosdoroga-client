import { Box, Flex, Text, Image } from '@chakra-ui/react';
import React from 'react';
import { FaRss } from 'react-icons/fa';
import { HiCollection } from 'react-icons/hi';
import { MdHome } from 'react-icons/md';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../../hooks/auth.hook';
import { SidebarItem } from './SidebarItem';

interface ISidebarProps {
  [props: string]: any
}

export const Sidebar: React.FC<ISidebarProps> = (props) => {


  const { userLogin, userPhoto, accessLevel } = useAuth()

  return (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      zIndex="sticky"
      h="full"
      pb="6"
      overflowX="hidden"
      overflowY="auto"
      bg={'#25292f'}
      borderColor={"#393f47"}
      borderRightWidth="1px"
      w="60"
      d={'flex'}
      color={"#EEF4FF"}
      flexDir={'column'}
      {...props}
    >
      <Flex px="4" py="5" align="center">
        <Text
          fontSize="2xl"
          ml="2"

          fontWeight="semibold"
        >
          Admin Panel
        </Text>
      </Flex>
      <Flex
        direction="column"
        as="nav"
        fontSize="15px"
        color="#EEF4FF"
        aria-label="Main Navigation"
      >
        <SidebarItem as={NavLink} exact to={'/admin'} icon={MdHome}>Главная</SidebarItem>
        <SidebarItem as={NavLink} exact to={'/admin/posts'} icon={FaRss}>Посты</SidebarItem>
        <SidebarItem as={NavLink} exact to={'/admin/users'} icon={HiCollection}>Пользователи</SidebarItem>
        {/* <SidebarItem icon={FaClipboardCheck}>Уведомления</SidebarItem> */}
      </Flex>
      <Box
        as={Link}
        to={`/profile/${userLogin}`}
        color="#EEF4FF"
        mt={'auto'}
        bg={'#12151A'}
        mx={3}
        borderRadius={'50px'}
        d={'flex'}
        alignItems={'center'}

      >
        <Box mr={3} flexShrink={0}>
          <Image src={userPhoto} boxSize={'50px'} borderRadius={'50px'} alt={''} />
        </Box>
        <Box fontSize={'sm'}>
          <Box>{userLogin}</Box>
          <Box color={'#83878d'}>{accessLevel === 5 && `Администратор (${accessLevel})`}</Box>
        </Box>
      </Box>
    </Box>
  );
}
