import { useToast } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Login } from '../../components/Auth/Login';
import { useAuth } from '../../hooks/auth.hook';
import { clearStateAuth, sendLoginDataThunk } from '../../redux/reducers/auth.reducer';

export const LoginContainer = () => {

  const { isFetching } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const history = useHistory()
  const { login } = useAuth()
  const toast = useToast()


  const onSubmitHandle = async (data) => {
    try {
      const response = await dispatch(sendLoginDataThunk(data)).unwrap()
      login(response.data.token, response.data.userId)
    } catch (e) {
      toast({
        title: e.title,
        description: e.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      })
    }
  }

  useEffect(() => {
    return () => {
      dispatch(clearStateAuth())
    }
  }, [history, dispatch])




  return (
    <Login onSubmitHandle={onSubmitHandle} isFetching={isFetching} />
  );
}


