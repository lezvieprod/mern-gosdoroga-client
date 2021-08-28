import { Box, Button, Container, Heading, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const PageUndefined: React.FC = () => {
  const location = useLocation()

  return (
    <Container mt={4} p={0}>
      <Box d={'flex'} flexDirection={'column'} bgColor={'white'} p={12} borderRadius={'xl'}>
        <VStack
          spacing={6}
          align="stretch"
          alignItems={'center'}
        >
          <Box>
            <Heading as={'h1'} size={'2xl'}>404</Heading>
          </Box>
          <Box>
            <Heading as={'h1'} size={'xl'}>Страница не найдена</Heading>
          </Box>
          <Box>
            <Text fontSize={'xl'}>
              Неизвестный путь <strong> {location.pathname} </strong>
            </Text>
          </Box>
          <Box>
            <Button as={Link} to={'/'} colorScheme="blue">
              Вернуться на главную
            </Button>
          </Box>
        </VStack>
      </Box>
    </Container>
  );
}

