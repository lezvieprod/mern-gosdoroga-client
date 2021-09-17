import React from 'react';
import { useParams } from 'react-router';
import { PageNoContent } from '../../components/common/PageNoContent';
import { PageUndefined } from '../../components/common/PageUndefined';
import { Preloader } from '../../components/common/Preloader';
import Posts from '../../components/Posts/Posts';
import { useAuth } from '../../hooks/auth.hook';
import { useMutate } from '../../hooks/mutate.hook';
import { useAsyncApi } from '../../hooks/query.hook';
import { IPost } from '../../models/post.interface';
import { useDeletePostMutation, useGetAllPostsQuery } from '../../redux/api/api';
import { POSTS_PER_PAGE } from '../../utils/constants';
interface IPostsContainerProps {
  authorLogin?: string,
  forAdmin?: boolean,
  isMiniItems?: boolean,
  itemsLimit?: number,
  withPagination?: boolean,
  sort?: 'dateasc' | 'datedesc'
}

const PostsContainer: React.FC<IPostsContainerProps> = ({
  authorLogin,
  forAdmin,
  isMiniItems,
  itemsLimit,
  withPagination,
  sort
}) => {

  const { pageNumber } = useParams<Record<string, string>>()

  const {
    data,
    isLoading,
    isFetching
  } = useAsyncApi<{ posts: IPost[], total: number }>(useGetAllPostsQuery, {
    authorLogin, page: pageNumber || 1, limit: itemsLimit || POSTS_PER_PAGE, sort: sort || 'datedesc'
  })

  const [deletePost] = useDeletePostMutation()
  const { asyncMutate } = useMutate()
  const { token } = useAuth()

  const onDeleteHandle = async (postId: string) => {
    token && await asyncMutate(deletePost({ postId, token }), true)
  }

  if (isLoading || isFetching) return <Preloader forInit />

  if (data && !data.posts.length) return <PageNoContent />

  if (data) return <Posts
    {...data}
    forAdmin={forAdmin}
    isMiniItems={isMiniItems}
    itemsLimit={itemsLimit}
    onDeleteHandle={onDeleteHandle}
    currentPage={pageNumber}
    authorLogin={authorLogin}
    withPagination={withPagination}
  />

  return <PageUndefined />
}

export default PostsContainer;
