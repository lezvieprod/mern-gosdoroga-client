import { Image } from '@chakra-ui/image';
import { Box, Flex, Heading } from '@chakra-ui/layout';
import React from 'react';
import { IUser } from '../../models/user.interface';
import { Route } from "react-router-dom";
import { ProfileMenu } from './ProfileParts/ProfileMenu';
import { ProfileInfo } from './ProfileParts/ProfileInfo';
import PostsContainer from '../../containers/Posts/PostsContainer';
interface IProfileProps {
  data: IUser
}

export const Profile: React.FC<IProfileProps> = ({ data }) => {

  const { userPhoto, userLogin, regDate, verified } = data;

  return (
    <Box>
      <Box bg={'#fff'} borderRadius={'md'} boxShadow="sm" mb={5}>
        <Box borderRadius={'md'} w={'100%'} h={'300px'} overflow={'hidden'}>
          <Image src={userPhoto} alt={userLogin} w={'100%'}
            h={'100%'} objectFit={'cover'} filter={'blur(18px)'} transform={'scale(1.2)'} />
        </Box>
        <Flex alignItems={'center'} justifyContent={'center'} flexDir={'column'} mt={'-150px'} pos={'relative'} px={6}>
          <Image src={userPhoto} alt={userLogin} border={'4px solid #fff'}
            boxSize={'170px'} objectFit={'cover'} borderRadius={'100%'} />
          <Heading as={'h1'} fontSize={'xx-large'} mt={2} textAlign={'center'} wordBreak={'break-word'}>
            {userLogin}
          </Heading>
        </Flex>
        {/* Рендеринг меню профиля */}
        <ProfileMenu userLogin={userLogin} />
      </Box>
      <Route exact path={'/profile/:userLogin'}>
        <ProfileInfo regDate={regDate} verified={verified} />
      </Route>
      <Route exact path={'/profile/:userLogin/posts'}>
        <PostsContainer authorLogin={userLogin} />
      </Route>
    </Box>
  );
}


