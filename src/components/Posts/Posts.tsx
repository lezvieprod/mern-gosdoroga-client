import { SimpleGrid, Heading, Flex } from '@chakra-ui/react';
import Pagination from '@choc-ui/paginator';
import React from 'react';
import { useHistory } from 'react-router';
import { PostsAdminItem } from '../../admin/components/PostsAdmin/PostsAdminItem';
import { PostsAdminMiniItem } from '../../admin/components/PostsAdmin/PostsAdminMiniItem';
import { useLang } from '../../hooks/lang.hook';
import { IPost } from '../../models/post.interface';
import { POSTS_PER_PAGE } from '../../utils/constants';
import PostItem from './PostItem';

interface IPostsProps {
  posts: IPost[],
  total: number,
  forAdmin?: boolean,
  onDeleteHandle(postId: string): void,
  currentPage: string,
  authorLogin?: string,
  isMiniItems?: boolean,
  itemsLimit?: number,
  withPagination?: boolean
}

const Posts: React.FC<IPostsProps> = ({
  posts,
  total,
  forAdmin,
  onDeleteHandle,
  currentPage,
  authorLogin,
  isMiniItems,
  itemsLimit,
  withPagination
}) => {

  const history = useHistory()
  const {lang, renderText} = useLang()

  return (
    <>
      {!authorLogin && !forAdmin && <Heading mb={8} fontSize={'24px'}>{renderText(lang).LAST_POSTS}</Heading>}
      {
        isMiniItems
          ? posts.map(post => <PostsAdminMiniItem key={post.postId} {...post} />)
          : <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4} w={'100%'}>
            {
              forAdmin
                ? posts.map(post => <PostsAdminItem key={post.postId} {...post} onDeleteHandle={onDeleteHandle} />)
                : posts.map(post => <PostItem key={post.postId} {...post} />)
            }
          </SimpleGrid>
      }
      {
        withPagination && (total > POSTS_PER_PAGE || itemsLimit) &&
        <Flex justifyContent={'center'} mt={8}>
          <Pagination
            current={Number(currentPage)}
            defaultCurrent={1}
            pageSize={POSTS_PER_PAGE}
            total={total}
            baseStyles={{ boxShadow: "md", bg: '#fff' }}
            activeStyles={{ bg: "blue.600", color: '#fff' }}
            paginationProps={{ display: "flex" }}
            pageNeighbours={2}
            onChange={(page) => {
              if (forAdmin) {
                if (authorLogin) {
                  return history.push(`/admin/posts/${authorLogin}/page/${page}`)
                } else {
                  return history.push(`/admin/posts/page/${page}`)
                }
              } else {
                if (authorLogin) {
                  return history.push(`/profile/${authorLogin}/posts/page/${page}`)
                } else {
                  return history.push(`/page/${page}`)
                }
              }
            }
            }
          />
        </Flex>
      }


    </>
  );
}

export default Posts;
