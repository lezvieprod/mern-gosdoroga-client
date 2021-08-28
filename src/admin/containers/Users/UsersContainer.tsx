import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUsersThunk } from '../../../redux/reducers/admin.reducer';
import { Users } from '../../components/Users/Users';
import { useAuth } from '../../../hooks/auth.hook';
import { useThunk } from '../../../hooks/thunk.hook';
import { RootState } from '../../../redux/store';

const UsersContainer: React.FC = () => {
  const { currentData } = useSelector((state: RootState) => state.admin)
  const { token } = useAuth()
  const { asyncThunk } = useThunk()

  useEffect(() => {
    asyncThunk(getUsersThunk(token))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <Users currentData={currentData} />
}

export default UsersContainer;
