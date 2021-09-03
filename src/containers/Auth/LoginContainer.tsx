import React from 'react';
import { useHistory } from 'react-router-dom';
import { Login } from '../../components/Auth/Login';
import { useAuth } from '../../hooks/auth.hook';
import { useMutate } from '../../hooks/mutate.hook';
import { useSendLoginMutation } from '../../redux/api/api';
import { ILoginSubmit } from '../../types/auth.interface';

const LoginContainer: React.FC = () => {

  const history = useHistory()
  const { login } = useAuth()
  const [sendLogin, { isLoading }] = useSendLoginMutation()
  const { asyncMutate } = useMutate()

  const onSubmitHandle = async (data: ILoginSubmit) => {
    try {
      const { token, userLogin, _id } = await asyncMutate(sendLogin(data))
      await login(token, userLogin, _id)
      history.push('/')
    } catch (e) { }
  }

  return <Login onSubmitHandle={onSubmitHandle} isLoading={isLoading} />
}

export default LoginContainer;

