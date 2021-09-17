import { Box, Image, Heading, Flex, Icon, HStack } from '@chakra-ui/react';
import React from 'react';
import { FiEye } from 'react-icons/fi';
import { VscAccount, VscCalendar } from 'react-icons/vsc';
import { Link } from 'react-router-dom';
import { useLang } from '../../hooks/lang.hook';
import { IPost } from '../../models/post.interface';
import { createPrettyDate } from '../../utils/date';


const PostItem: React.FC<IPost> = ({
  fullUrl,
  createDate,
  imageBefore,
  title,
  author,
  views,
  description
}) => {

  const { lang, renderText } = useLang()

  return (
    <Box bg={'#fff'} borderRadius={'md'} overflow={'hidden'} boxShadow={'sm'} pos={'relative'}>
      <Flex p={4} flexDir={'column'} h={'100%'}>
        <Box w={'100%'} mb={4}>
          <Image
            w={'100%'}
            h={'180px'}
            borderRadius={'md'}
            objectFit={'cover'}
            src={imageBefore}
            alt={title}
          />
        </Box>
        <Heading
          as={'h2'}
          fontSize={'20px'}
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
        <Box fontSize={'sm'} mb={4}>
          {description.substring(0, 90) + '...'}
        </Box>
        <HStack fontSize={'sm'} mt={'auto'} spacing={3}>
          <Flex alignItems={'center'}>
            <Icon as={VscAccount} boxSize={'17px'} mr={1} title={renderText(lang).AUTHOR} />
            <Box
              as={Link}
              to={'/profile/' + author.userLogin}
              ml={1}
              zIndex={5}
              pos={'relative'}
              borderBottom={'1px solid transparent'}
              sx={{ '&:hover': { borderBottom: '1px solid', borderColor: 'blue.400' } }}
            >
              {author.userLogin}
            </Box>
          </Flex>
          <Flex alignItems={'center'}>
            <Icon as={VscCalendar} boxSize={'17px'} mr={1} title={renderText(lang).CREATE_DATE} />
            {createPrettyDate(createDate)}
          </Flex>
          <Flex alignItems={'center'}>
            <Icon as={FiEye} boxSize={'17px'} mr={1} title={renderText(lang).VIEWS} />
            {views}
          </Flex>

        </HStack>
      </Flex>
      <Box as={Link} to={fullUrl}
        pos={'absolute'}
        top={0}
        left={0}
        right={0}
        bottom={0}
        w={'100%'}
        h={'100%'}
        zIndex={0}
      />
    </Box>
  );
}

export default PostItem;
