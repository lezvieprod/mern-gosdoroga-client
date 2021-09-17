import React from 'react';
import { Users } from '../../components/Users/Users';
import { useDeleteUserMutation, useGetAllUsersQuery } from '../../../redux/api/api';
import { useAsyncApi } from '../../../hooks/query.hook';
import { useAuth } from '../../../hooks/auth.hook';
import { IUser } from '../../../models/user.interface';
import { Preloader } from '../../../components/common/Preloader';
import { PageUndefined } from '../../../components/common/PageUndefined';
import { useParams } from 'react-router';
import { USERS_PER_PAGE } from '../../../utils/constants';
import { useMutate } from '../../../hooks/mutate.hook';
import { PageNoContent } from '../../../components/common/PageNoContent';

interface UsersContainerProps {
  sort?: 'dateasc',
  isMiniItems?: boolean,
  itemsLimit?: number,
  withPagination?: boolean,
}

const UsersContainer: React.FC<UsersContainerProps> = ({
  isMiniItems,
  itemsLimit,
  withPagination,
  sort
}) => {

  const { pageNumber } = useParams<Record<string, string>>()
  const { token } = useAuth()
  const {
    data,
    isLoading,
    isFetching
  } = useAsyncApi<{ users: IUser[], total: number }>(useGetAllUsersQuery, {
    token, page: pageNumber || 1, limit: itemsLimit || USERS_PER_PAGE, sort: sort || 'datedesc'
  })

  const [deleteUser] = useDeleteUserMutation()
  const { asyncMutate } = useMutate()

  const onDeleteHandle = async (userId: number) => {
    token && await asyncMutate(deleteUser({ userId, token }), true)
  }

  if (isLoading || isFetching) return <Preloader forInit />

  if (data && !data.users.length) return <PageNoContent />

  if (data) return <Users
    {...data}
    isMiniItems={isMiniItems}
    itemsLimit={itemsLimit}
    currentPage={pageNumber}
    withPagination={withPagination}
    onDeleteHandle={onDeleteHandle}
  />

  return <PageUndefined />
}

export default UsersContainer;
