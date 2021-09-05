import { SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import { IPost } from '../../models/post.interface';
import PostItem from './PostItem';

interface IPostsProps {
  data: IPost[]
}

const Posts: React.FC<IPostsProps> = ({ data }) => {
  return (
    <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4} w={'100%'}>
      {
        data.map(post => <PostItem key={post.postId} {...post} /> )
      }
    </SimpleGrid>
  );
}

export default Posts;
