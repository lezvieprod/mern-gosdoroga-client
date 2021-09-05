import { Avatar } from '@chakra-ui/avatar';
import { Button } from '@chakra-ui/button';
import { FormControl, FormErrorMessage, FormHelperText, FormLabel } from '@chakra-ui/form-control';
import Icon from '@chakra-ui/icon';
import { Image } from '@chakra-ui/image';
import { Input } from '@chakra-ui/input';
import { Box, Container, Flex, Heading, SimpleGrid, Text, VStack } from '@chakra-ui/layout';
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
                {
                  !image
                    ?
                    <chakra.label borderRadius={'md'}
                      overflow={'hidden'} htmlFor="image-upload" d={'flex'} w={'100%'} h={'100px'} cursor={'pointer'}>
                      <Flex alignItems="center" justifyContent={'center'} w={'100%'} h={'100px'} border={'1px dashed #666'} borderRadius={'md'}>
                        <Button
                          type="button"
                          bg={'transparent'}
                          size="lg"
                          fontWeight="medium"
                          _focus={{ shadow: "none" }}
                          pointerEvents="none"
                        >
                          {!image ? 'Загрузить изображение' : 'Изменить изображение'}
                        </Button>
                      </Flex>
                    </chakra.label>
                    :
                    <chakra.label
                      borderRadius={'md'}
                      overflow={'hidden'}
                      sx={{
                        "&:hover span": {
                          opacity: "1",
                          visibility: "visible"
                        },
                      }}
                      htmlFor="image-upload" d={'flex'} w={'100%'} cursor={'pointer'} pos={'relative'}>
                      <Flex
                        as={'span'}
                        opacity={'0'}
                        visibility={'hidden'}
                        pos={'absolute'}
                        w={'100%'}
                        h={'100%'}
                        bg={'rgba(0,0,0, 0.5)'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        color={'#fff'}
                        fontSize={'20px'}
                        transition={'all .3s ease'}
                      >
                        Изменить изображение
                      </Flex>
                      <Flex alignItems={'center'} w={'100%'}>
                        <Image
                          w={'100%'}
                          h={'270px'}
                          objectFit={'cover'}
                          bg={"gray.100"}
                          border={!!errors.postImageBefore ? '2px solid red' : '0'}
                          icon={<Icon as={FaUser} boxSize={9} mt={3} rounded="full" color={"gray.300"} />}
                          src={URL.createObjectURL(image[0])} alt={image[0].name}
                        />
                      </Flex>
                    </chakra.label>
                }
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
          <VStack spacing={2} align="stretch">
            <Button type={'submit'} colorScheme="blue" variant="solid" isLoading={isLoading}>
              Добавить пост
            </Button>

          </VStack>
        </form>
      </Box>

  );
}


