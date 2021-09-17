import React, { useState } from 'react';
import { Box, Image, Heading, Flex, Icon } from '@chakra-ui/react';
import { IPost } from '../../../models/post.interface';
import { NavButton } from '../../../components/common/custom/NavButton';
import { CAlertDialog } from '../../../components/common/CAlertDialog';
import { Link } from 'react-router-dom';
import { createPrettyDate } from '../../../utils/date';
import { useLang } from '../../../hooks/lang.hook';
import { VscAccount, VscCalendar } from 'react-icons/vsc';
import { FiEye } from 'react-icons/fi';


interface IPostItemProps extends IPost {
  forAdmin?: boolean,
  onDeleteHandle(postId: string): void
}

export const PostsAdminItem: React.FC<IPostItemProps> = ({
  postId,
  fullUrl,
  imageBefore,
  createDate,
  title,
  author,
  _id,
  slugTitle,
  onDeleteHandle,
  views,
  description
}) => {

  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen(false)
  const { lang, renderText } = useLang()

  return (
    <Box
      borderRadius={'md'}
      border={'1px solid'}
      borderColor={'#e9e9e9'}
      overflow={'hidden'}
      pos={'relative'}
      d={'flex'}
      flexDir={'column'}
    >
      <Flex fontSize={'13px'} px={4} py={2}>
        <Box mr={5}> PostID: {postId}</Box>
        <Box>_ID: {_id}</Box>
      </Flex>
      <Flex p={4} pos={'relative'} flexDir={{ xs: "column", xl: "row", xxl: "row" }} h={'100%'} bg={'#fff'} _hover={{
        bg: '#F3F3F3'
      }}>
        <Box mr={4} minW={'150px'}>
          <Image
            w={'100%'}
            h={'95px'}
            borderRadius={'md'}
            objectFit={'cover'}
            src={imageBefore}
            alt={title}
          />
        </Box>
        <Box>
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
          <Box fontSize={'sm'} mb={4} wordBreak={'break-word'}>
            {description.substring(0, 50) + '...'}
          </Box>
          <Flex fontSize={'sm'} mt={'auto'}>
            <Flex alignItems={'center'} mr={4}>
              <Icon as={VscCalendar} boxSize={'17px'} mr={1} title={renderText(lang).CREATE_DATE} />
              {createPrettyDate(createDate)}
            </Flex>
            <Flex alignItems={'center'} mr={4}>
              <Icon as={VscAccount} boxSize={'17px'} mr={1} title={renderText(lang).AUTHOR} />
              <Box
                as={Link}
                to={'/profile/' + author.userLogin}
                ml={1}
                zIndex={5}
                pos={'relative'}
                borderBottom={'1px solid transparent'}
                sx={{ '&:hover': { borderColor: 'blue.400' } }}
              >
                {author.userLogin}
              </Box>
            </Flex>
            <Flex alignItems={'center'}>
              <Icon as={FiEye} boxSize={'17px'} mr={1} title={renderText(lang).VIEWS} />
              {views}
            </Flex>
          </Flex>
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
      <Flex borderTop={'1px solid #ececec'} mt={'auto'}>
        <NavButton as={Link} to={`/admin/posts/edit/${postId}-${slugTitle}`} flex={1} py={2} borderRight={'1px solid #ececec'} zIndex={'1'} pos={'relative'} d={'flex'} justifyContent={'center'}>
          {renderText(lang).EDIT}
        </NavButton>
        <NavButton onClick={() => setIsOpen(true)} flex={1} py={2} zIndex={'1'} pos={'relative'} d={'flex'} justifyContent={'center'}>
        {renderText(lang).DELETE}
        </NavButton>
        <CAlertDialog
          isOpen={isOpen}
          onClose={onClose}
          onAgreed={() => onDeleteHandle(String(postId))}
          dialogHeader={renderText(lang).DELETE_POST_SURE_TITLE}
          dialogBody={`${renderText(lang).DELETE_POST_SURE_DESC} - ${postId}`}
          cancelButtonText={renderText(lang).CANCEL}
          agreedButtonText={renderText(lang).DELETE}
        />
      </Flex>
    </Box>
  );
}


