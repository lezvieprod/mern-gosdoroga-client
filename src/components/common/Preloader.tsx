import { Box, CircularProgress } from '@chakra-ui/react';
import React from 'react';

interface IPreloaderProps {
  forInit?: boolean
}

export const Preloader: React.FC<IPreloaderProps> = ({ forInit }) => {
  return (
    <Box d={'flex'} justifyContent={'center'} alignItems={'center'} py={4} my={forInit ? '5rem' : '0'}>
      <CircularProgress isIndeterminate color="blue" />
    </Box>
  );
}

