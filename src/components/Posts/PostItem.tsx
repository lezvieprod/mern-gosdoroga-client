import { Box, Image, Heading, Flex } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { IPost } from '../../models/post.interface';

interface IPostItemProps extends IPost {

}


const PostItem: React.FC<IPostItemProps> = ({
  createDate,
  description,
  fullUrl,
  imageBefore,
  isCompleted,
  title,
  author
}) => {


  return (
    <Box bg={'#fff'} borderRadius={'md'} overflow={'hidden'} boxShadow={'sm'} pos={'relative'}>
      <Flex p={4} flexDir={'column'} h={'100%'}>
        <Box w={'100%'} mb={3}>
          <Image
            w={'100%'}
            h={'150px'}
            borderRadius={'md'}
            objectFit={'cover'}
            src={imageBefore}
            alt={title}
          />
        </Box>
        <Heading
          as={'h2'}
          fontSize={'large'}
          mb={3}
          maxH={'4rem'}
          d={'-webkit-box'}
          overflow={'hidden'}
          textOverflow={'ellipsis'}
          sx={{
            WebkitLineClamp: "2",
            WebkitBoxOrient: 'vertical'
          }}
        >
          {title}
        </Heading>
        <Box fontSize={'sm'} mt={'auto'}>
          <Box>
            Статус: {isCompleted ? 'Выполнено' : 'Ожидает исполнения'}
          </Box>
          <Box>
            Автор: {author.userLogin}
          </Box>
        </Box>
      </Flex>
      <Box as={Link} to={fullUrl}
        pos={'absolute'}
        top={0}
        left={0}
        right={0}
        bottom={0}
        w={'100%'}
        h={'100%'}
      />
    </Box>
  );
}

export default PostItem;
