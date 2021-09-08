import { SimpleGrid } from '@chakra-ui/layout';
import React from 'react';
import { IPost } from '../../../models/post.interface';


interface IPostsAdminProps {
  data: IPost[]
}

export const PostsAdmin: React.FC<IPostsAdminProps> = ({ data }) => {
  return (
    <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4} w={'100%'}>
      {
        // data.map(post => <PostItem key={post.postId} {...post} />)
      }
    </SimpleGrid>
  );
}


