import { Image } from '@chakra-ui/image';
import { Box, Flex, Heading, SimpleGrid } from '@chakra-ui/layout';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { IUser } from '../../models/user.interface';
import { NavButton } from '../common/custom/NavButton';
import { Route, Switch } from "react-router-dom";

interface IProfileProps {
  data: IUser
}

export const Profile: React.FC<IProfileProps> = ({ data }) => {

  const {
    userPhoto,
    userLogin,
    regDate,
    verified
  } = data;

  console.log(data);


  return (
    <Box my={4}>
      <Box bg={'#fff'} borderRadius={'md'} boxShadow="sm">
        <Box borderRadius={'md'} w={'100%'} h={'300px'} overflow={'hidden'}>
          <Image
            src={userPhoto}
            alt={userLogin}
            w={'100%'} h={'100%'} objectFit={'cover'} filter={'blur(18px)'} transform={'scale(1.2)'} />
        </Box>
        <Flex alignItems={'center'} justifyContent={'center'} flexDir={'column'} mt={'-150px'} pos={'relative'} px={6}>
          <Image
            src={userPhoto}
            alt={userLogin}
            border={'4px solid #fff'}
            boxSize={'170px'} objectFit={'cover'} borderRadius={'100%'} />
          <Heading as={'h1'} fontSize={'xx-large'} mt={2} textAlign={'center'} wordBreak={'break-word'}>
            {userLogin}
          </Heading>
        </Flex>
        <Box mt={7}>
          <Flex px={7}>
            <NavButton
              exact
              as={NavLink}
              to={`/profile/${userLogin}`}
              mr={6}
              borderTopRadius={'md'}
              py={4} px={0} activeStyle={{ borderBottom: '2px solid #1876F2' }}
              _hover={{ background: 'initial', borderBottom: '2px solid #b1d3ff' }}
            >
              Информация
            </NavButton>
            <NavButton
              exact
              as={NavLink}
              to={`/profile/${userLogin}/posts`}
              borderTopRadius={'md'}
              py={4} px={0} activeStyle={{ borderBottom: '2px solid #1876F2' }}
              _hover={{ background: 'initial', borderBottom: '2px solid #b1d3ff' }}
            >
              Посты
            </NavButton>
          </Flex>
        </Box>
      </Box>
      <Route exact path={'/profile/:userLogin'}>
        <Box mt={4} bg={'#fff'} borderRadius={'md'} boxShadow="sm">
          <SimpleGrid columns={2} spacing={10}>
            <Flex justifyContent={'center'} alignItems={'center'} p={6} flexDir={'column'}>
              <Box mb={2}>Дата регистрации:</Box>
              {new Date(regDate).toLocaleString('ru', { year: 'numeric', month: 'long', day: 'numeric' })}
            </Flex>
            <Flex justifyContent={'center'} alignItems={'center'} p={6} flexDir={'column'}>
              <Box mb={2}>Статус аккаунта:</Box>
              {verified === 0 ? 'Неподтвережденный' : 'Подтвержденный'}
            </Flex>
          </SimpleGrid>
        </Box>
      </Route>
    </Box>
  );
}


