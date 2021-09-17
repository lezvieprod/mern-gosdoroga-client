import { Avatar, HStack, Box, Button, chakra, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Icon, Input, SimpleGrid, Text, VisuallyHidden, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { IRegSubmit } from '../../types/auth.interface';
import { EmailValidateParams, PasswordValidateParams, renderFieldError, UserLoginValidateParams, UserPhotoValidateParams } from '../../utils/validations';
import { FaUser } from 'react-icons/fa';
import { AVAILABLE_REG_IMAGE_FORMATS } from '../../utils/constants';
import { useLang } from '../../hooks/lang.hook';

interface IRegProps {
  onSubmitHandle(data: FormData): void,
  isLoading: boolean,
}

export const Reg: React.FC<IRegProps> = ({ onSubmitHandle, isLoading }) => {

  const { lang, renderText } = useLang()
  const { register, handleSubmit, watch, getValues, formState: { errors } } = useForm<IRegSubmit>();
  const onSubmit = handleSubmit(data => {
    let bodyFormData = new FormData();
    bodyFormData.append('email', data.email);
    bodyFormData.append('password', data.password);
    bodyFormData.append('userLogin', data.userLogin);
    bodyFormData.append('userPhoto', data.userPhoto[0]);

    onSubmitHandle(bodyFormData)
  })

  const [image, setImage] = useState<FileList>()
  const userPhoto: FileList | undefined = watch('userPhoto') && watch('userPhoto').length && getValues().userPhoto

  useEffect(() => {
    setImage(userPhoto);
  }, [userPhoto])


  return (
    <>
      <Box mb={6}>
        <Heading as={'h1'} fontSize={'3xl'}>{renderText(lang).REGISTRATION}</Heading>
      </Box>
      <form onSubmit={onSubmit} >
        <VStack spacing={6} align="stretch" mb={6}>
          <SimpleGrid columns={2} spacing={6}>
            <FormControl id="email" isInvalid={!!errors.email}>
              <FormLabel>Email</FormLabel>
              <Input type="text" {...register("email", EmailValidateParams)} />
              <FormErrorMessage>
                {errors.email && renderFieldError('email', errors.email.type)}
              </FormErrorMessage>
            </FormControl>
            <FormControl id="userLogin" isInvalid={!!errors.userLogin}>
              <FormLabel>{renderText(lang).LOGIN}</FormLabel>
              <Input type={'text'} {...register("userLogin", UserLoginValidateParams)} />
              <FormErrorMessage>
                {errors.userLogin && renderFieldError('userLogin', errors.userLogin.type)}
              </FormErrorMessage>
            </FormControl>
          </SimpleGrid>
          <FormControl isInvalid={!!errors.userPhoto}>
            <FormLabel>
              {renderText(lang).PROFILE_PHOTO}
            </FormLabel>
            <Flex alignItems="center">
              {
                !image
                  ?
                  <Avatar
                    boxSize={'70px'}
                    bg={"gray.100"}
                    icon={<Icon as={FaUser} boxSize={9} mt={3} rounded="full" color={"gray.300"} />}
                  />
                  :
                  <Avatar
                    boxSize={'70px'}
                    bg={"gray.100"}
                    border={!!errors.userPhoto ? '2px solid red' : '0'}
                    icon={<Icon as={FaUser} boxSize={9} mt={3} rounded="full" color={"gray.300"} />}
                    src={URL.createObjectURL(image[0])} alt={image[0].name}
                  />
              }
              <Box ml={5} d={'flex'} flexDir={'column'}>
                <chakra.label
                  htmlFor="image-upload"
                  cursor="pointer"
                  rounded="md"
                  fontSize="md"
                  color={"gray.500"}
                  pos="relative"
                  _hover={{
                    color: "gray.600",
                  }}
                >
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    fontWeight="medium"
                    _focus={{ shadow: "none" }}
                    pointerEvents="none"
                  >
                    {!image ? renderText(lang).SET_IMAGE : renderText(lang).CHANGE_IMAGE}
                  </Button>
                  <VisuallyHidden>
                    <input id={'image-upload'} type="file"
                      {...register("userPhoto", UserPhotoValidateParams)} accept=".jpg, .jpeg, .png" />
                  </VisuallyHidden>
                </chakra.label>
                <Text mt={2} fontSize={'sm'} color={'gray.500'}>{renderText(lang).PERMITTED_FORMATS}: {AVAILABLE_REG_IMAGE_FORMATS.join(", ")}</Text>
              </Box>
            </Flex>
            <FormErrorMessage mt={2}>
              {errors.userPhoto && renderFieldError('userPhoto', errors.userPhoto.type)}
            </FormErrorMessage>
          </FormControl>
          <SimpleGrid columns={2} spacing={6}>
            <FormControl id="password" isInvalid={!!errors.password}>
              <FormLabel>{renderText(lang).PASSWORD}</FormLabel>
              <Input type="password" {...register("password", PasswordValidateParams)} />
              <FormErrorMessage>
                {errors.password && renderFieldError('password', errors.password.type)}
              </FormErrorMessage>
            </FormControl>
            <FormControl id="password_repeat" isInvalid={!!errors.password_repeat}>
              <FormLabel>{renderText(lang).REPEAT_PASSWORD}</FormLabel>
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
          </SimpleGrid>
        </VStack>
        <HStack mt={9} spacing={2} align="stretch" alignItems={'center'} justifyContent={'space-between'}>
          <Button type={'submit'} colorScheme="blue" px={12} variant="solid" isLoading={isLoading}>
            {renderText(lang).REG_IN}
          </Button>
          <Box as={Link} to={'/auth/login'} borderBottom={'1px solid'} borderColor={'blue.400'}>
            {renderText(lang).HAS_ACC_QUEST}
          </Box>
        </HStack>
      </form>
    </>

  );
}


