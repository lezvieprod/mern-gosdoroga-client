import React, { useState } from 'react';
import { Box, Image, Heading, Flex } from '@chakra-ui/react';
import { IPost } from '../../../models/post.interface';
import { NavButton } from '../../../components/common/custom/NavButton';
import { CAlertDialog } from '../../../components/common/CAlertDialog';
import { Link } from 'react-router-dom';
import { createPrettyDate } from '../../../utils/date';


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
  onDeleteHandle
}) => {

  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen(false)

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
            h={'90px'}
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
          <Box fontSize={'sm'} mt={'auto'}>
            <Box>
              Дата: {createPrettyDate(createDate)}
            </Box>
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
          </Box>
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
          Изменить
        </NavButton>
        <NavButton onClick={() => setIsOpen(true)} flex={1} py={2} zIndex={'1'} pos={'relative'} d={'flex'} justifyContent={'center'}>
          Удалить
        </NavButton>
        <CAlertDialog
          isOpen={isOpen}
          onClose={onClose}
          onAgreed={() => onDeleteHandle(String(postId))}
          dialogHeader={'Вы действительно хотите удалить этот пост?'}
          dialogBody={`Действие невозможно будет отменить. Идентификатор удаляемого поста - ${postId}`}
          cancelButtonText={'Отмена'}
          agreedButtonText={'Удалить'}
        />
      </Flex>
    </Box>
  );
}


