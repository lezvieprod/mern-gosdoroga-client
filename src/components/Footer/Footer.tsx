import { Box, Container, Link } from '@chakra-ui/layout';
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <Box bg={'#fff'} borderTop={'1px solid #e0e0e0'} py={5}>
      <Container>
        Developed by
        <Link ml={1} color={'blue.600'} href={'https://github.com/lezvieprod'} target={'_blank'}>
          lezvieprod
        </Link>
      </Container>
    </Box>
  );
}


