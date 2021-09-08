import { SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import { PostsAdminItem } from '../../admin/components/PostsAdmin/PostsAdminItem';
import { IPost } from '../../models/post.interface';
import PostItem from './PostItem';

interface IPostsProps {
  data: IPost[],
  forAdmin?: boolean,
  onDeleteHandle(postId: string): Promise<any>
}

const Posts: React.FC<IPostsProps> = ({ data, forAdmin, onDeleteHandle }) => {
  return (
    <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4} w={'100%'}>
      {
        forAdmin
          ? data.map(post => <PostsAdminItem key={post.postId} {...post} forAdmin={forAdmin} onDeleteHandle={onDeleteHandle} />)
          : data.map(post => <PostItem key={post.postId} {...post} />)

      }
    </SimpleGrid>
  );
}

export default Posts;
