import Icon from '@chakra-ui/icon';
import { Badge, Box, Flex, HStack } from '@chakra-ui/layout';
import React from 'react';
import { VscAccount, VscCalendar } from 'react-icons/vsc';
import { Link } from 'react-router-dom';
import { useLang } from '../../../hooks/lang.hook';
import { IPost } from '../../../models/post.interface';
import { createPrettyDate } from '../../../utils/date';



export const PostsAdminMiniItem: React.FC<IPost> = ({
  fullUrl, title, author, createDate
}) => {

  const { lang, renderText } = useLang()

  return (
    <Flex flexDir={'column'} _hover={{ bg: '#f7f7f7' }} p={1} borderRadius={'md'} pos={'relative'}>
      <Box fontWeight={600}>
        {title}
        {
          new Date(createDate).getTime() + 60 * 60 * 24 * 1000 >= Date.now()
            ? <Badge ml={2} colorScheme="blue">{renderText(lang).NEW}</Badge>
            : null
        }
      </Box>
      <Box fontSize={'15px'} color={'gray.600'}>
        <HStack spacing={4}>
          <Flex alignItems={'center'}>
            <Icon as={VscAccount} boxSize={'17px'} mr={1} title={renderText(lang).AUTHOR} />
            <Box as={Link} zIndex={5} pos={'relative'} to={'/profile/' + author.userLogin}> {author.userLogin} </Box>
          </Flex>
          <Flex alignItems={'center'}>
            <Icon as={VscCalendar} boxSize={'17px'} mr={1} title={renderText(lang).CREATE_DATE} />
            {' ' + createPrettyDate(createDate)}
          </Flex>
        </HStack>
      </Box>
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
    </Flex>
  );
}

