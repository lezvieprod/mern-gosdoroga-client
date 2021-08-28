import { SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import PostItem from './PostItem';

const Posts: React.FC = () => {
  return (
    <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4} w={'100%'}>
      <PostItem />
    </SimpleGrid>
  );
}

export default Posts;
