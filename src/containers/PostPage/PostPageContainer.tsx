import React from 'react';
import { useHistory, useParams } from 'react-router';
import { PostEdit } from '../../admin/components/PostEdit/PostEdit';
import { PageUndefined } from '../../components/common/PageUndefined';
import { Preloader } from '../../components/common/Preloader';
import { PostPage } from '../../components/PostPage/PostPage';
import { useAuth } from '../../hooks/auth.hook';
import { useMutate } from '../../hooks/mutate.hook';
import { useAsyncApi } from '../../hooks/query.hook';
import { IPost } from '../../models/post.interface';
import { useEditPostMutation, useGetPostQuery } from '../../redux/api/api';
import { IGetPostQuery } from '../../types/post.interface';

interface IPostPageContainerProps {
  forEdit?: boolean
}

const PostPageContainer: React.FC<IPostPageContainerProps> = ({ forEdit }) => {

  const { postId, slugTitle } = useParams<Record<string, string>>()
  const { data, isLoading, isFetching } = useAsyncApi<IPost, IGetPostQuery>(useGetPostQuery, { postId, slugTitle })

  const [editPost, { isLoading: editLoading }] = useEditPostMutation()
  const { asyncMutate } = useMutate()
  const { token } = useAuth()
  const history = useHistory()

  const onPostEditHandle = async (editedData: FormData, editedPostId: string) => {
    token && await asyncMutate(editPost({ editedData, token, editedPostId }), true)
    history.push('/admin/posts')
  }

  if (isLoading || isFetching) return <Preloader forInit />

  if (data) return !forEdit ? <PostPage {...data} /> : <PostEdit {...data} onPostEditHandle={onPostEditHandle} isLoading={editLoading} />;

  return <PageUndefined withLayout={false} />
}

export default PostPageContainer

