import { Box, Button, FormControl, FormErrorMessage, FormLabel, Heading, HStack, Input, VStack } from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useLang } from '../../hooks/lang.hook';
import { ILoginSubmit } from '../../types/auth.interface';
import { EmailValidateParams, PasswordValidateParams, renderFieldError } from '../../utils/validations';

interface ILoginProps {
  onSubmitHandle(data: ILoginSubmit): void,
  isLoading: boolean,
}

export const Login: React.FC<ILoginProps> = ({ onSubmitHandle, isLoading }) => {

  const { register, handleSubmit, formState: { errors } } = useForm<ILoginSubmit>();
  const onSubmit = handleSubmit(data => onSubmitHandle(data))
  const { lang, renderText } = useLang()

  return (
    <>
      <Box mb={6}>
        <Heading as={'h1'} size={'lg'}>{renderText(lang).LOG_IN_TITLE}</Heading>
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
            <FormLabel> {renderText(lang).PASSWORD}</FormLabel>
            <Input type="password" {...register("password", PasswordValidateParams)} />
            <FormErrorMessage>
              {errors.password && renderFieldError('password', errors.password.type)}
            </FormErrorMessage>
          </FormControl>
        </VStack>
        <HStack spacing={2} align="stretch" alignItems={'center'} justifyContent={'space-between'}>
          <Button type={'submit'} colorScheme="blue" px={12} variant="solid" isLoading={isLoading}>
            {renderText(lang).LOG_IN}
          </Button>
          <Box as={Link} to={'/auth/registration'} borderBottom={'1px solid'} borderColor={'blue.400'}>
            {renderText(lang).NO_ACC_QUEST}
          </Box>
        </HStack>
      </form>
    </>
  );
}


