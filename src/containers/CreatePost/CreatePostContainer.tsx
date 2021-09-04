import React from 'react';
import { CreatePost } from '../../components/CreatePost/CreatePost';
import { useAuth } from '../../hooks/auth.hook';
import { useMutate } from '../../hooks/mutate.hook';
import { useCreatePostMutation } from '../../redux/api/api';
import { IPostCreateSubmit } from '../../types/post.interface';

export const CreatePostContainer: React.FC = () => {

  const [createPost, { isLoading }] = useCreatePostMutation()
  const { asyncMutate } = useMutate()
  const { token } = useAuth()

  const onCreatePostHandle = async (data: FormData) => {
    if (token) {
      await asyncMutate(createPost({ data, token }))
    }
  }

  return <CreatePost onCreatePostHandle={onCreatePostHandle} isLoading={isLoading} />
}

