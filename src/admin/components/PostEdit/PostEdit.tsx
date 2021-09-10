import React, { useEffect, useState } from 'react';
import { Button } from '@chakra-ui/button';
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Box, Flex, Heading, Text, VStack } from '@chakra-ui/layout';
import { chakra } from '@chakra-ui/system';
import { Textarea } from '@chakra-ui/textarea';
import VisuallyHidden from '@chakra-ui/visually-hidden';
import { useForm } from 'react-hook-form';
import { PostDescriptionValidateParams, PostImageBeforeValidateParams, PostTitleValidateParams, renderFieldError } from '../../../utils/validations';
import { IPostCreateSubmit } from '../../../types/post.interface';
import { RenderPostFormImage } from '../../../components/CreatePost/FormParts/RenderPostFormImage';
import { AVAILABLE_POST_IMAGE_FORMATS } from '../../../utils/constants';
import { IPost } from '../../../models/post.interface';


interface ICreatePostProps extends IPost {
  isLoading: boolean,
  onPostEditHandle(data: FormData, editedPostId: string): void
}

export const PostEdit: React.FC<ICreatePostProps> = ({
  author,
  createDate,
  description,
  imageBefore,
  isCompleted,
  postId,
  title,

  onPostEditHandle,
  isLoading
}) => {

  const { register, handleSubmit, watch, getValues, formState: { errors } } = useForm<IPostCreateSubmit>();
  const [image, setImage] = useState<FileList>()
  const loadedImageBefore: FileList | undefined = watch('postImageBefore') && watch('postImageBefore').length && getValues().postImageBefore

  const onSubmit = handleSubmit(data => {
    let editPostFormData = new FormData();
    editPostFormData.append('title', data.postTitle);
    editPostFormData.append('description', data.postDescription);
    if (loadedImageBefore) {
      editPostFormData.append('imageBefore', data.postImageBefore[0])
    } else {
      editPostFormData.append('imageBefore', imageBefore)
    }

    onPostEditHandle(editPostFormData, String(postId))
  })

  useEffect(() => {
    setImage(loadedImageBefore);
  }, [loadedImageBefore])

  return (
    <Box bg={'#fff'} boxShadow={'sm'} borderRadius={'md'} p={8}>
      <form onSubmit={onSubmit} >
        <VStack spacing={6} align="stretch" mb={6}>
          <Heading as={'h1'} fontSize={'x-large'}>Редактирование поста</Heading>
          <FormControl id="title" isInvalid={!!errors.postTitle}>
            <FormLabel>Заголовок</FormLabel>
            <Input type="text" defaultValue={title} {...register("postTitle", PostTitleValidateParams)} />
            <FormErrorMessage>
              {errors.postTitle && renderFieldError('postTitle', errors.postTitle.type)}
            </FormErrorMessage>
          </FormControl>
          <FormControl id="postDescription" isInvalid={!!errors.postDescription}>
            <FormLabel>Описание</FormLabel>
            <Textarea
              defaultValue={description}
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
              <Box maxW={'500px'}>
                {
                  !!imageBefore && !image
                    ? <RenderPostFormImage image={imageBefore} errors={errors} />
                    : <RenderPostFormImage image={image} errors={errors} />
                }
              </Box>
              <Box d={'flex'} flexDir={'column'} w={'100%'}>
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
                    {
                      !!imageBefore
                      ? <input id={'image-upload'} type="file" {...register("postImageBefore", {...PostImageBeforeValidateParams, required: false})} />
                      : <input id={'image-upload'} type="file" {...register("postImageBefore", PostImageBeforeValidateParams)} />
                    }
                   
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
          Редактировать пост
        </Button>
      </form>
    </Box>

  );
}




