import { Box, Container, Heading, VStack } from '@chakra-ui/layout';
import { Stat,  StatGroup, StatHelpText, StatLabel, StatNumber } from '@chakra-ui/stat';
import React from 'react';
import { NavButton } from '../../../components/common/custom/NavButton';
import PostsContainer from '../../../containers/Posts/PostsContainer';
import { Link } from 'react-router-dom';
import UsersContainer from '../../containers/Users/UsersContainer';


interface MainAdminProps {
  usersTotal: number,
  postsTotal: number
}

export const MainAdmin: React.FC<MainAdminProps> = ({ usersTotal, postsTotal }) => {
  return (
    <Container>
      <Heading my={12}> Статистика приложения </Heading>
      <StatGroup>
        <Stat pr={5}>
          <StatLabel fontSize={'25px'}>Посты</StatLabel>
          <StatNumber fontSize={'35px'} >{postsTotal}</StatNumber>
          <Box d={'flex'} flexDir={'column'} border={'1px solid #e9e9e9'} mt={5} borderRadius={'md'}>
            <Box p={4}>
              <Heading fontSize={'18px'} mb={6}> Последние посты </Heading>
              <VStack spacing={2} alignItems={'stretch'}>
                <PostsContainer forAdmin isMiniItems itemsLimit={4} />
              </VStack>
            </Box>
            <NavButton as={Link} to={`/admin/posts`} flex={1} py={2} borderTop={'1px solid #ececec'} zIndex={'1'} pos={'relative'} d={'flex'} justifyContent={'center'}>
              Смотреть все посты
            </NavButton>
          </Box>
        </Stat>
        <Stat>
          <StatLabel fontSize={'25px'}>Пользователи</StatLabel>
          <StatNumber fontSize={'35px'}>{usersTotal}</StatNumber>
          <Box d={'flex'} flexDir={'column'} border={'1px solid #e9e9e9'} mt={5} borderRadius={'md'}>
            <Box p={4}>
              <Heading fontSize={'18px'} mb={6}> Последние пользователи </Heading>
              <VStack spacing={2} alignItems={'stretch'}>
                <UsersContainer isMiniItems itemsLimit={4}/>
              </VStack>
            </Box>
            <NavButton as={Link} to={`/admin/posts`} flex={1} py={2} borderTop={'1px solid #ececec'} zIndex={'1'} pos={'relative'} d={'flex'} justifyContent={'center'}>
              Смотреть всех пользователей
            </NavButton>
          </Box>
        </Stat>
      </StatGroup>
    </Container>
  );
}

