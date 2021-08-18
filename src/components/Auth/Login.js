import { Box, Button, Container, FormControl, FormErrorMessage, FormHelperText, FormLabel, Heading, Input, VStack } from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';


export const Login = ({onSubmitHandle, isFetching}) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => onSubmitHandle(data);

  return (
    <Box bgColor={'white'} p={6} borderRadius={'xl'}>
    <Box mb={6}>
      <Heading as={'h1'} size={'lg'}>Авторизация</Heading>
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
          <FormErrorMessage>
            {errors.email && errors.email.type === 'pattern' && 'Введен некорректный email'}
            {errors.email && errors.email.type === 'required' && 'Это поле обязательно для заполнения'}
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
        
      </VStack>
      <VStack
        spacing={2}
        align="stretch"
      >
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


