import React, { useEffect, useState } from 'react';
import { Button } from '@chakra-ui/button';
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Box, Flex, Heading, Text, VStack } from '@chakra-ui/layout';
import { chakra } from '@chakra-ui/system';
import { Textarea } from '@chakra-ui/textarea';
import VisuallyHidden from '@chakra-ui/visually-hidden';
import { useForm } from 'react-hook-form';
import { IPostCreateSubmit } from '../../types/post.interface';
import { AVAILABLE_POST_IMAGE_FORMATS } from '../../utils/constants';
import { PostDescriptionValidateParams, PostImageBeforeValidateParams, PostTitleValidateParams, renderFieldError } from '../../utils/validations';
import { RenderPostFormImage } from './FormParts/RenderPostFormImage';

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
    <Box bg={'#fff'} boxShadow={'sm'} borderRadius={'md'} p={8}>
      <form onSubmit={onSubmit} >
        <VStack spacing={6} align="stretch" mb={6}>
          <Heading as={'h1'} fontSize={'x-large'}>Добавление поста</Heading>
          <FormControl id="title" isInvalid={!!errors.postTitle}>
            <FormLabel>Заголовок</FormLabel>
            <Input type="text" {...register("postTitle", PostTitleValidateParams)} />
            <FormErrorMessage>
              {errors.postTitle && renderFieldError('postTitle', errors.postTitle.type)}
            </FormErrorMessage>
          </FormControl>
          <FormControl id="postDescription" isInvalid={!!errors.postDescription}>
            <FormLabel>Описание</FormLabel>
            <Textarea
              {...register("postDescription", PostDescriptionValidateParams)}
              size="sm"
              minH={'140px'}
              borderRadius={'md'}
            />
            <FormErrorMessage>
              {errors.postDescription && renderFieldError('postDescription', errors.postDescription.type)}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.postImageBefore}>
            <FormLabel>
              Фотография
            </FormLabel>
            <Flex alignItems="center" flexWrap={'wrap'}>
              {/* Рендеринг изображения */}
              <RenderPostFormImage image={image} errors={errors} />
              <Box d={'flex'} flexDir={'column'}>
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
                  <VisuallyHidden>
                    <input id={'image-upload'} type="file"
                      {...register("postImageBefore", PostImageBeforeValidateParams)} />
                  </VisuallyHidden>
                </chakra.label>
                <Text mt={2} fontSize={'sm'} color={'gray.500'}>Разрешенные форматы: {AVAILABLE_POST_IMAGE_FORMATS.join(", ")}</Text>
              </Box>
            </Flex>
            <FormErrorMessage mt={2}>
              {errors.postImageBefore && renderFieldError('postImageBefore', errors.postImageBefore.type)}
            </FormErrorMessage>
          </FormControl>
        </VStack>
        <Button type={'submit'} px={10} colorScheme="blue" variant="solid" isLoading={isLoading}>
          Добавить пост
        </Button>
      </form>
    </Box>

  );
}




