import { Box, Button, Container, FormControl, FormErrorMessage, FormHelperText, FormLabel, Heading, Input, useColorModeValue, VStack } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";

export const Reg = ({ onSubmitHandle, isFetching }) => {
  const { register, handleSubmit, getValues, watch, formState: { errors } } = useForm();
  const onSubmit = data => onSubmitHandle(data);


  return (

    <Box  bg={useColorModeValue("#FCFCFC", "gray.900")} p={6} borderRadius={'xl'}>
      <Box mb={6}>
        <Heading as={'h1'} size={'lg'}>Регистрация</Heading>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack
          spacing={6}
          align="stretch"
          mb={6}
        >
          <FormControl id="email" isInvalid={errors.email}>
            <FormLabel>Email</FormLabel>
            <Input
              type="text"
              {...register("email",
                {
                  required: true,
                  pattern: /^\S+@\S+$/i
                }
              )}
            />
            <FormHelperText>Мы никогда никому не покажем ваш email.</FormHelperText>
            <FormErrorMessage>
              {errors.email && errors.email.type === 'pattern' && 'Введен некорректный email'}
              {errors.email && errors.email.type === 'required' && 'Это поле обязательно для заполнения'}
            </FormErrorMessage>
          </FormControl>
          <FormControl id="login" isInvalid={errors.login}>
            <FormLabel>Логин</FormLabel>
            <Input
              type={'text'}
              {...register("login",
                {
                  required: true,
                  pattern: /^[A-Za-z0-9]+$/i,
                  minLength: 5,
                  maxLength: 20
                }
              )}
            />
            <FormErrorMessage>
              {errors.login && errors.login.type === 'minLength' && 'Минимальное количество символов 5'}
              {errors.login && errors.login.type === 'maxLength' && 'Максимальное количество символов 20'}
              {errors.login && errors.login.type === 'pattern' && 'В поле ввода обнаружены некорректные символы'}
              {errors.login && errors.login.type === 'required' && 'Это поле обязательно для заполнения'}
            </FormErrorMessage>
          </FormControl>
          <FormControl id="password" isInvalid={errors.password}>
            <FormLabel>Пароль</FormLabel>
            <Input
              type="password"
              {...register("password",
                {
                  required: true,
                  minLength: 5,
                  maxLength: 20
                }
              )}
            />
            <FormErrorMessage>
              {errors.password && errors.password.type === 'minLength' && 'Минимальная длина пароля 5 символов'}
              {errors.password && errors.password.type === 'maxLength' && 'Максимальное количество символов 20'}
              {errors.password && errors.password.type === 'required' && 'Это поле обязательно для заполнения'}
            </FormErrorMessage>
          </FormControl>
          <FormControl id="password_repeat" isInvalid={errors.password_repeat}>
            <FormLabel>Повторите пароль</FormLabel>
            <Input
              type="password"
              {...register("password_repeat",
                {
                  required: true,
                  minLength: 5,
                  maxLength: 20,
                  validate: {
                    passwordMatch: value => (value === getValues().password) || 'Пароли не совпадают',
                  }
                }
              )}
            />
            <FormErrorMessage>
              {errors.password_repeat && errors.password_repeat.type === 'minLength' && 'Минимальная длина пароля 5 символов'}
              {errors.password_repeat && errors.password_repeat.type === 'passwordMatch' && errors.password_repeat.message}
              {errors.password_repeat && errors.password_repeat.type === 'maxLength' && 'Максимальное количество символов 20'}
              {errors.password_repeat && errors.password_repeat.type === 'required' && 'Это поле обязательно для заполнения'}
            </FormErrorMessage>
          </FormControl>
        </VStack>
        <VStack
          spacing={2}
          align="stretch"
        >
          <Button type={'submit'} colorScheme="blue" variant="solid" isLoading={isFetching}>
            Зарегистрироваться
          </Button>
          <Button to={'/auth/login'} as={Link} colorScheme="blue" variant="outline">
            Есть аккаунт?
          </Button>
        </VStack>
      </form>
    </Box>

  );
}


