import { Image } from '@chakra-ui/image';
import { Box } from '@chakra-ui/layout';
import React from 'react';
import { IUser } from '../../models/user.interface';

interface IProfileProps {
  data: IUser
}

export const Profile: React.FC<IProfileProps> = ({ data }) => {

  const {
    userPhoto,
    userLogin
  } = data;

  return (
    <Box my={4}>
      <Box>
        {userLogin}
        <Image src={userPhoto} alt="" />
      </Box>
    </Box>
  );
}


