import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setIsFetching } from '../../../redux/reducers/admin.reducer';
import { Users } from '../../components/Users/Users';
import { useGetAllUsersQuery } from '../../../redux/api/api';
import { useAsyncApi } from '../../../hooks/query.hook';
import { useAuth } from '../../../hooks/auth.hook';

const UsersContainer: React.FC = () => {
  
  const dispatch = useDispatch()
  const { token } = useAuth()
  const { data, isLoading } = useAsyncApi<string>(useGetAllUsersQuery, token)

  useEffect(() => {
    dispatch(setIsFetching(isLoading))
  }, [dispatch, isLoading])

  return <Users currentData={data} />
}

export default UsersContainer;
