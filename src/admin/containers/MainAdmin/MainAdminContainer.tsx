import React from 'react';
import { PageUndefined } from '../../../components/common/PageUndefined';
import { Preloader } from '../../../components/common/Preloader';
import { useAuth } from '../../../hooks/auth.hook';
import { useAsyncApi } from '../../../hooks/query.hook';
import { useGetAllCountersQuery } from '../../../redux/api/api';
import { MainAdmin } from '../../components/MainAdmin/MainAdmin';

export const MainAdminContainer: React.FC = () => {

  const { token } = useAuth()
  const {
    data,
    isLoading,
    isFetching
  } = useAsyncApi<{ usersTotal: number, postsTotal: number }>(useGetAllCountersQuery, token)

  if (isLoading || isFetching) return <Preloader forInit />

  if (data) return <MainAdmin {...data}/>

  return <PageUndefined />
}

