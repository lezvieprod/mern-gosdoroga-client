import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Login } from '../../components/Auth/Login';
import { useAuth } from '../../hooks/auth.hook';
import { useThunk } from '../../hooks/thunk.hook';
import { clearStateAuth, sendLoginDataThunk } from '../../redux/reducers/auth.reducer';

export const LoginContainer = () => {

  const { isFetching } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const history = useHistory()
  const { login } = useAuth()
  const { asyncThunk } = useThunk()

  const onSubmitHandle = async (data) => {
    try {
      const { data: { token, userLogin, _id } } = await asyncThunk(sendLoginDataThunk(data))
      await login(token, userLogin, _id)
      history.push('/')
    } catch (e) { }
  }

  useEffect(() => {
    return () => dispatch(clearStateAuth())
  }, [history, dispatch])

  return <Login onSubmitHandle={onSubmitHandle} isFetching={isFetching} />
}


