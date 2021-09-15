import { Badge, Box, Flex, HStack } from '@chakra-ui/layout';
import React from 'react';
import { Link } from 'react-router-dom';
import { IUser } from '../../../models/user.interface';

export const UserMiniItem: React.FC<IUser> = ({
  userLogin, email, accessLevel, regDate
}) => {

  return (
    <Flex flexDir={'column'} _hover={{ bg: '#f7f7f7' }} p={1} borderRadius={'md'} pos={'relative'}>
      <Box fontWeight={600}>
        {userLogin}
        {
         new Date(regDate).getTime() + 60 * 60 * 24 * 1000 >= Date.now()
            ? <Badge ml={2} colorScheme="blue">Новый</Badge>
            : null
        }
      </Box>
      <Box fontSize={'15px'} color={'gray.600'}>
        <HStack spacing={4}>
          <Flex>
            {email}
          </Flex>
          <Flex>
            Уровень доступа: {accessLevel}
          </Flex>
        </HStack>
      </Box>
      <Box as={Link} to={'/profile/' + userLogin}
        pos={'absolute'}
        top={0}
        left={0}
        right={0}
        bottom={0}
        w={'100%'}
        h={'100%'}
        zIndex={0}
      />
    </Flex>
  );
}

