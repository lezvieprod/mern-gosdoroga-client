import React from 'react';
import { useParams } from 'react-router';
import { PageUndefined } from '../../components/common/PageUndefined';
import { Preloader } from '../../components/common/Preloader';
import { Profile } from '../../components/Profile/Profile';
import { useAsyncApi } from '../../hooks/query.hook';
import { IUser } from '../../models/user.interface';
import { useGetUserByLoginQuery } from '../../redux/api/api';

const ProfileContainer: React.FC = () => {

  const { userLogin } = useParams<Record<string, string>>()
  const { data, isLoading, isFetching } = useAsyncApi<IUser, string>(useGetUserByLoginQuery, userLogin)

  if (isLoading || isFetching) return <Preloader forInit />
  if (data) return <Profile data={data} />

  return <PageUndefined withLayout={false} />
}

export default ProfileContainer


