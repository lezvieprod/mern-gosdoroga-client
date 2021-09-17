import { Box, Container, Heading, VStack } from '@chakra-ui/layout';
import { Stat,  StatGroup, StatLabel, StatNumber } from '@chakra-ui/stat';
import React from 'react';
import { NavButton } from '../../../components/common/custom/NavButton';
import PostsContainer from '../../../containers/Posts/PostsContainer';
import { Link } from 'react-router-dom';
import UsersContainer from '../../containers/Users/UsersContainer';
import { useLang } from '../../../hooks/lang.hook';


interface MainAdminProps {
  usersTotal: number,
  postsTotal: number
}

export const MainAdmin: React.FC<MainAdminProps> = ({ usersTotal, postsTotal }) => {

  const {lang, renderText} = useLang()

  return (
    <Container>
      <Heading my={12}> {renderText(lang).APP_STAT_TITLE} </Heading>
      <StatGroup>
        <Stat pr={5}>
          <StatLabel fontSize={'25px'}>{renderText(lang).POSTS}</StatLabel>
          <StatNumber fontSize={'35px'} >{postsTotal}</StatNumber>
          <Box d={'flex'} flexDir={'column'} border={'1px solid #e9e9e9'} mt={5} borderRadius={'md'}>
            <Box p={4}>
              <Heading fontSize={'18px'} mb={6}> {renderText(lang).LAST_POSTS} </Heading>
              <VStack spacing={2} alignItems={'stretch'}>
                <PostsContainer forAdmin isMiniItems itemsLimit={4} />
              </VStack>
            </Box>
            <NavButton as={Link} to={`/admin/posts`} flex={1} py={2} borderTop={'1px solid #ececec'} zIndex={'1'} pos={'relative'} d={'flex'} justifyContent={'center'}>
            {renderText(lang).SEE_ALL_POSTS}
            </NavButton>
          </Box>
        </Stat>
        <Stat>
          <StatLabel fontSize={'25px'}>{renderText(lang).USERS}</StatLabel>
          <StatNumber fontSize={'35px'}>{usersTotal}</StatNumber>
          <Box d={'flex'} flexDir={'column'} border={'1px solid #e9e9e9'} mt={5} borderRadius={'md'}>
            <Box p={4}>
              <Heading fontSize={'18px'} mb={6}> {renderText(lang).LAST_USERS} </Heading>
              <VStack spacing={2} alignItems={'stretch'}>
                <UsersContainer isMiniItems itemsLimit={4}/>
              </VStack>
            </Box>
            <NavButton as={Link} to={`/admin/users`} flex={1} py={2} borderTop={'1px solid #ececec'} zIndex={'1'} pos={'relative'} d={'flex'} justifyContent={'center'}>
              {renderText(lang).SEE_ALL_USERS}
            </NavButton>
          </Box>
        </Stat>
      </StatGroup>
    </Container>
  );
}

