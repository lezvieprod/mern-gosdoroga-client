import { Avatar } from '@chakra-ui/avatar';
import { Button } from '@chakra-ui/button';
import { FormControl, FormErrorMessage, FormHelperText, FormLabel } from '@chakra-ui/form-control';
import Icon from '@chakra-ui/icon';
import { Input } from '@chakra-ui/input';
import { Box, Container, Flex, SimpleGrid, Text, VStack } from '@chakra-ui/layout';
import { chakra } from '@chakra-ui/system';
import { Textarea } from '@chakra-ui/textarea';
import VisuallyHidden from '@chakra-ui/visually-hidden';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaUser } from 'react-icons/fa';
import { IPostCreateSubmit } from '../../types/post.interface';
import { AVAILABLE_POST_IMAGE_FORMATS } from '../../utils/constants';
import { PostDescriptionValidateParams, PostImageBeforeValidateParams, PostTitleValidateParams, renderFieldError } from '../../utils/validations';


interface ICreatePostProps {
  isLoading: boolean,
  onCreatePostHandle(data: FormData): void
}

export const CreatePost: React.FC<ICreatePostProps> = ({ onCreatePostHandle, isLoading }) => {

  const { register, handleSubmit, watch, getValues, formState: { errors } } = useForm<IPostCreateSubmit>();
  const [image, setImage] = useState<FileList>()
  const imageBefore: FileList | undefined = watch('postImageBefore') && watch('postImageBefore').length && getValues().postImageBefore

  const onSubmit = handleSubmit(data => {
    let createPostFormData = new FormData();
    createPostFormData.append('title', data.postTitle); 
    createPostFormData.append('description', data.postDescription); 
    createPostFormData.append('imageBefore', data.postImageBefore[0]); 
    onCreatePostHandle(createPostFormData)
  })

  useEffect(() => {
    setImage(imageBefore);
  }, [imageBefore])

  return (
    <Container mt={10} p={0} variant={'modal'}>
      <Box bg={'#fff'} boxShadow={'sm'} borderRadius={'md'}>
        <form onSubmit={onSubmit} >
          <VStack spacing={6} align="stretch" mb={6}>
            <SimpleGrid columns={2} spacing={6}>
              <FormControl id="title" isInvalid={!!errors.postTitle}>
                <FormLabel>title</FormLabel>
                <Input type="text" {...register("postTitle", PostTitleValidateParams)} />
                <FormHelperText>Мы никогда никому не покажем ваш email.</FormHelperText>
                <FormErrorMessage>
                  {errors.postTitle && renderFieldError('postTitle', errors.postTitle.type)}
                </FormErrorMessage>
              </FormControl>
              <FormControl id="postDescription" isInvalid={!!errors.postDescription}>
                <FormLabel>postDescription</FormLabel>
                <Textarea
                  {...register("postDescription", PostDescriptionValidateParams)}
                  size="sm"
                />
                <FormErrorMessage>
                  {errors.postDescription && renderFieldError('postDescription', errors.postDescription.type)}
                </FormErrorMessage>
              </FormControl>
            </SimpleGrid>
            <FormControl isInvalid={!!errors.postImageBefore}>
              <FormLabel>
                Фото профиля
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
                      border={!!errors.postImageBefore ? '2px solid red' : '0'}
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
                      {!image ? 'Установить изображение' : 'Изменить изображение'}
                    </Button>
                    <VisuallyHidden>
                      <input id={'image-upload'} type="file"
                        {...register("postImageBefore", PostImageBeforeValidateParams)} />
                    </VisuallyHidden>
                  </chakra.label>
                  <Text mt={2} fontSize={'sm'} color={'gray.500'}>Разрешенные форматы: {AVAILABLE_POST_IMAGE_FORMATS.join(", ")}</Text>
                </Box>
              </Flex>
              <FormErrorMessage mt={2}>
                {errors.postImageBefore && renderFieldError('userPhoto', errors.postImageBefore.type)}
              </FormErrorMessage>
            </FormControl>
           
          </VStack>
          <VStack spacing={2} align="stretch">
            <Button type={'submit'} colorScheme="blue" variant="solid" isLoading={isLoading}>
              Зарегистрироваться
            </Button>

          </VStack>
        </form>
      </Box>
    </Container>
  );
}


