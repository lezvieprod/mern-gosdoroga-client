import { SimpleGrid, Heading, Flex } from '@chakra-ui/react';
import Pagination from '@choc-ui/paginator';
import React from 'react';
import { useHistory } from 'react-router';
import { PostsAdminItem } from '../../admin/components/PostsAdmin/PostsAdminItem';
import { IPost } from '../../models/post.interface';
import { POSTS_PER_PAGE } from '../../utils/constants';
import PostItem from './PostItem';

interface IPostsProps {
  posts: IPost[],
  total: number,
  forAdmin?: boolean,
  onDeleteHandle(postId: string): void,
  currentPage: string,
  authorLogin?: string
}

const Posts: React.FC<IPostsProps> = ({
  posts,
  total,
  forAdmin,
  onDeleteHandle,
  currentPage,
  authorLogin
}) => {

  const history = useHistory()

  return (
    <>
      {!authorLogin && !forAdmin && <Heading mb={8} fontSize={'24px'}>Последние посты</Heading>}
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4} w={'100%'} mb={8}>
        {
          forAdmin
            ? posts.map(post => <PostsAdminItem key={post.postId} {...post} forAdmin={forAdmin} onDeleteHandle={onDeleteHandle} />)
            : posts.map(post => <PostItem key={post.postId} {...post} />)
        }
      </SimpleGrid>
      <Flex justifyContent={'center'} >
        {
          total > POSTS_PER_PAGE
          &&
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
                  return history.push(`/${authorLogin}/page/${page}`)
                } else {

                  return history.push(`/page/${page}`)
                }
              }
            }
            }
          />
        }

      </Flex>
    </>
  );
}

export default Posts;
