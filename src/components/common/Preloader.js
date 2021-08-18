import { Box, CircularProgress } from '@chakra-ui/react';
import React from 'react';

export const Preloader = () => {
  return (
    <Box d={'flex'} justifyContent={'center'} alignItems={'center'} py={4}>
      <CircularProgress isIndeterminate color="blue" />
    </Box>
  );
}

