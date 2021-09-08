import React from 'react';
import { PageUndefined } from '../../components/common/PageUndefined';
import { Preloader } from '../../components/common/Preloader';
import Posts from '../../components/Posts/Posts';
import { useAuth } from '../../hooks/auth.hook';
import { useMutate } from '../../hooks/mutate.hook';
import { useAsyncApi } from '../../hooks/query.hook';
import { IPost } from '../../models/post.interface';
import { useDeletePostMutation, useGetAllPostsQuery } from '../../redux/api/api';

interface IPostsContainerProps {
  authorLogin?: string,
  forAdmin?: boolean
}

const PostsContainer: React.FC<IPostsContainerProps> = ({ authorLogin, forAdmin }) => {

  const { data, isLoading, isFetching } = useAsyncApi<IPost[]>(useGetAllPostsQuery, authorLogin)
  const [deletePost] = useDeletePostMutation()
  const { asyncMutate } = useMutate()
  const { token } = useAuth()

  const onDeleteHandle = async (postId: string): Promise<any> => token && await asyncMutate(deletePost({ postId, token }))

  if (isLoading || isFetching) return <Preloader forInit />

  if (data) return <Posts data={data} forAdmin={forAdmin} onDeleteHandle={onDeleteHandle} />

  return <PageUndefined />
}

export default PostsContainer;
