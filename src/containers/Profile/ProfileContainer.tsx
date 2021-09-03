import React, { useEffect } from 'react';
import { Profile } from '../../components/Profile/Profile';
import { useAuth } from '../../hooks/auth.hook';
import { useThunk } from '../../hooks/thunk.hook';


export const ProfileContainer: React.FC = () => {
  const { token } = useAuth()
  const { asyncThunk } = useThunk()

  useEffect(() => {
    // asyncThunk(getUsersThunk(token))
  }, [])

  return <Profile />;
}


