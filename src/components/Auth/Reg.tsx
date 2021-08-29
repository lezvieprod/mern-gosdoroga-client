import { Box, Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, Heading, Input, VStack } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { IRegSubmit } from '../../types/auth.interface';
import { EmailValidateParams, PasswordValidateParams, renderFieldError, UserLoginValidateParams } from '../../utils/validations';

interface IRegProps {
  onSubmitHandle(data: IRegSubmit): void,
  isFetching: boolean,
}

export const Reg: React.FC<IRegProps> = ({ onSubmitHandle, isFetching }) => {

  const { register, handleSubmit, getValues, formState: { errors } } = useForm<IRegSubmit>();
  const onSubmit = handleSubmit(data => onSubmitHandle(data))

  return (
    <>
      <Box mb={6}>
        <Heading as={'h1'} size={'lg'}>Регистрация</Heading>
      </Box>
      <form onSubmit={onSubmit}>
        <VStack spacing={6} align="stretch" mb={6}>
          <FormControl id="email" isInvalid={!!errors.email}>
            <FormLabel>Email</FormLabel>
            <Input type="text" {...register("email", EmailValidateParams)} />
            <FormHelperText>Мы никогда никому не покажем ваш email.</FormHelperText>
            <FormErrorMessage>
              {errors.email && renderFieldError('email', errors.email.type)}
            </FormErrorMessage>
          </FormControl>
          <FormControl id="login" isInvalid={!!errors.userLogin}>
            <FormLabel>Логин</FormLabel>
            <Input type={'text'} {...register("userLogin", UserLoginValidateParams)} />
            <FormErrorMessage>
              {errors.userLogin && renderFieldError('userLogin', errors.userLogin.type)}
            </FormErrorMessage>
          </FormControl>
          <FormControl id="password" isInvalid={!!errors.password}>
            <FormLabel>Пароль</FormLabel>
            <Input type="password" {...register("password", PasswordValidateParams)} />
            <FormErrorMessage>
              {errors.password && renderFieldError('password', errors.password.type)}
            </FormErrorMessage>
          </FormControl>
          <FormControl id="password_repeat" isInvalid={!!errors.password_repeat}>
            <FormLabel>Повторите пароль</FormLabel>
            <Input type="password" {...register("password_repeat",
                {
                  required: true,
                  minLength: 5,
                  maxLength: 20,
                  validate: {
                    passwordMatch: value => (value === getValues().password)
                  }
                }
              )}
            />
            <FormErrorMessage>
              {errors.password_repeat && renderFieldError('password_repeat', errors.password_repeat.type)}
            </FormErrorMessage>
          </FormControl>
        </VStack>
        <VStack spacing={2} align="stretch">
          <Button type={'submit'} colorScheme="blue" variant="solid" isLoading={isFetching}>
            Зарегистрироваться
          </Button>
          <Button to={'/auth/login'} as={Link} colorScheme="blue" variant="outline">
            Есть аккаунт?
          </Button>
        </VStack>
      </form>
    </>

  );
}


