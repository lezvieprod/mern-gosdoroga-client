import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersThunk } from '../../../redux/reducers/admin.reducer';
import { Users } from '../../components/Users/Users';

export const UsersContainer = () => {
  const {currentData} = useSelector(state => state.admin)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUsersThunk())
  }, [])

  return <Users currentData={currentData}/>
}

