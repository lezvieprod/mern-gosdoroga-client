import { Box, Container, Flex, Heading, HStack } from '@chakra-ui/layout';
import React from 'react';
import { IPost } from '../../models/post.interface';
import { Link } from 'react-router-dom';
import { Image } from '@chakra-ui/image';
import { createPrettyDate } from '../../utils/date';
import Icon from '@chakra-ui/icon';
import { VscAccount, VscCalendar, VscEdit } from 'react-icons/vsc';
import { FiEye } from 'react-icons/fi';


export const PostPage: React.FC<IPost> = ({
  author,
  createDate,
  description,
  imageBefore,
  title,
  lastEdited,
  views
}) => {

  return (
    <Box bg={'#fff'} boxShadow={'sm'} borderRadius={'md'} py={12}>
      <Container variant={'modal'}>
        <Heading as={'h1'} fontSize={'40px'}>
          {title}
        </Heading>
        <HStack mt={4} spacing={5}>
          <Flex alignItems={'center'}>
            <Icon as={VscAccount} boxSize={'17px'} mr={1} title={'Автор'} />
            <Box
              as={Link}
              to={'/profile/' + author.userLogin}
              ml={1}
              zIndex={5}
              pos={'relative'}
              sx={{ '&:hover': { borderBottom: '1px solid', borderColor: 'blue.400' } }}
            >
              {author.userLogin}
            </Box>
          </Flex>
          <Flex alignItems={'center'}>
            <Icon as={VscCalendar} boxSize={'17px'} mr={1} title={'Дата создания'} />
            {createPrettyDate(createDate)}
          </Flex>
          {
            lastEdited
            &&
            <Flex alignItems={'center'}>
              <Icon as={VscEdit} boxSize={'17px'} mr={1} title={'Отредактировано'} />
              {' ' + new Date(lastEdited).toLocaleString('ru', { year: 'numeric', month: 'numeric', day: 'numeric' })}
            </Flex>
          }
          <Flex alignItems={'center'}>
            <Icon as={FiEye} boxSize={'17px'} mr={1} title={'Отредактировано'} />
            {views}
          </Flex>
        </HStack>
        <Box mt={7}>
          <Image w={'100%'} h={'250px'} src={imageBefore} alt={title} objectFit={'cover'} borderRadius={'md'} />
        </Box>
        <Box mt={7} fontSize={'18px'}>
          {description}
        </Box>
      </Container>
    </Box>
  );
}

