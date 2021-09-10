import { Box, Container, Heading, HStack } from '@chakra-ui/layout';
import React from 'react';
import { IPost } from '../../models/post.interface';
import { Link } from 'react-router-dom';
import { Image } from '@chakra-ui/image';

interface IPostPageProps extends IPost { }

export const PostPage: React.FC<IPostPageProps> = ({
  author,
  createDate,
  description,
  imageBefore,
  isCompleted,
  postId,
  title,
  lastEdited
}) => {

  return (
    <Box bg={'#fff'} boxShadow={'sm'} borderRadius={'md'} py={12}>
      <Container variant={'modal'}>
        <Heading as={'h1'} fontSize={'40px'}>
          {title}
        </Heading>
        <HStack mt={4} spacing={5}>
          <Box>
            Автор:
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
          </Box>
          <Box>
            Статус: {isCompleted ? 'Выполнено' : 'Ожидает исполнения'}
          </Box>
          {
            lastEdited
            &&
            <Box>
              Последнее изменение: 
              {' ' + new Date(lastEdited).toLocaleString('ru', { year: 'numeric', month: 'numeric', day: 'numeric' })}
            </Box>
          }

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

