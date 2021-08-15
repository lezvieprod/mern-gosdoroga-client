import { Box, Button, chakra, Container, FormControl, FormHelperText, FormLabel, Heading, Input, VStack } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';


export const Login = () => {
  return (
    <Container mt={4} p={0}>
      <Box bgColor={'white'} p={6} borderRadius={'xl'}>
        <Box mb={6}>
          <Heading as={'h1'} size={'lg'}>Авторизация</Heading>
        </Box>
        <VStack
          spacing={6}
          align="stretch"
          mb={6}
        >
          <FormControl id="email">
            <FormLabel>Email</FormLabel>
            <Input type="email" />
            <FormHelperText>Мы никогда никому не покажем ваш email.</FormHelperText>
          </FormControl>
          <FormControl id="password">
            <FormLabel>Пароль</FormLabel>
            <Input type="password" />
          </FormControl>
        </VStack>
        <VStack
          spacing={2}
          align="stretch"
        >
          <Button colorScheme="blue" variant="solid">
            Войти
          </Button>
          <Button to={'/auth/registration'} as={Link} colorScheme="blue" variant="outline">
            Нет аккаунта?
          </Button>
        </VStack>
      </Box>
    </Container>
  );
}


