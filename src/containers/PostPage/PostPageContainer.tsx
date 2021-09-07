import React from 'react';
import { useParams } from 'react-router';
import { PageUndefined } from '../../components/common/PageUndefined';
import { Preloader } from '../../components/common/Preloader';
import { PostPage } from '../../components/PostPage/PostPage';
import { useAsyncApi } from '../../hooks/query.hook';
import { IPost } from '../../models/post.interface';
import { useGetPostQuery } from '../../redux/api/api';


const PostPageContainer: React.FC = () => {

  const { postId, slugTitle } = useParams<Record<string, string>>()
  const { data, isLoading, isFetching } = 
    useAsyncApi<IPost, { postId: string, slugTitle: string }>(useGetPostQuery, { postId, slugTitle })

  if (isLoading || isFetching) return <Preloader forInit />

  if (data) return <PostPage {...data} />;

  return <PageUndefined withLayout={false} />
}

export default PostPageContainer

