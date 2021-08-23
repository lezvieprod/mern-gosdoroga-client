import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUsersThunk } from '../../../redux/reducers/admin.reducer';
import { Users } from '../../components/Users/Users';
import { useAuth } from '../../../hooks/auth.hook';
import { useThunk } from '../../../hooks/thunk.hook';

export const UsersContainer = () => {
  const { currentData } = useSelector(state => state.admin)
  const { token } = useAuth()
  const { asyncThunk } = useThunk()

  useEffect(() => {
    asyncThunk(getUsersThunk(token))
  }, [])

  return <Users currentData={currentData} />
}

