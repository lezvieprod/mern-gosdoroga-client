import React from 'react';
import { PageUndefined } from '../../components/common/PageUndefined';
import { Preloader } from '../../components/common/Preloader';
import Posts from '../../components/Posts/Posts';
import { useAsyncApi } from '../../hooks/query.hook';
import { IPost } from '../../models/post.interface';
import { useGetAllPostsQuery } from '../../redux/api/api';
interface IPostsContainerProps {
  authorLogin?: string
}

const PostsContainer: React.FC<IPostsContainerProps> = ({ authorLogin }) => {

  const { data, isLoading, isFetching } = useAsyncApi<IPost[]>(useGetAllPostsQuery, authorLogin)
  if (isLoading || isFetching) return <Preloader forInit />

  if (data) return <Posts data={data} />

  return <PageUndefined />
}

export default PostsContainer;
