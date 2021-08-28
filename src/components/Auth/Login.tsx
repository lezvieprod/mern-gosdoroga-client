import { Box, Button, FormControl, FormErrorMessage, FormLabel, Heading, Input, useColorModeValue, VStack } from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { ILoginSubmit } from '../../types/auth.interface';
import { EmailValidateParams, PasswordValidateParams, renderFieldError } from '../../utils/validations';

interface ILoginProps {
  onSubmitHandle(data: ILoginSubmit): void,
  isFetching: boolean,
}

export const Login: React.FC<ILoginProps> = ({ onSubmitHandle, isFetching }) => {

  const { register, handleSubmit, formState: { errors } } = useForm<ILoginSubmit>();
  const onSubmit = handleSubmit(data => onSubmitHandle(data))

  return (
    <Box bg={useColorModeValue("#FCFCFC", "gray.900")} p={6} borderRadius={'xl'}>
      <Box mb={6}>
        <Heading as={'h1'} size={'lg'}>Авторизация</Heading>
      </Box>
      <form onSubmit={onSubmit}>
        <VStack spacing={6} align="stretch" mb={6}>
          <FormControl id="email" isInvalid={!!errors.email}>
            <FormLabel>Email</FormLabel>
            <Input type="text" {...register("email", EmailValidateParams)} />
            <FormErrorMessage>
              {errors.email && renderFieldError('email', errors.email.type)}
            </FormErrorMessage>
          </FormControl>
          <FormControl id="password" isInvalid={!!errors.password}>
            <FormLabel>Пароль</FormLabel>
            <Input type="password" {...register("password", PasswordValidateParams)} />
            <FormErrorMessage>
              {errors.password && renderFieldError('password', errors.password.type)}
            </FormErrorMessage>
          </FormControl>
        </VStack>
        <VStack spacing={2} align="stretch">
          <Button type={'submit'} colorScheme="blue" variant="solid" isLoading={isFetching}>
            Войти
          </Button>
          <Button to={'/auth/registration'} as={Link} colorScheme="blue" variant="outline">
            Нет аккаунта?
          </Button>
        </VStack>
      </form>
    </Box>
  );
}


