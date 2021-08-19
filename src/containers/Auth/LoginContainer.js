import { useToast } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Login } from '../../components/Auth/Login';
import { CAlert } from '../../components/common/CAlert';
import { useAuth } from '../../hooks/auth.hook';
import { useLang } from '../../hooks/lang.hook';
import { useRedirectTimer } from '../../hooks/timer.hook';
import { clearStateAuth, sendLoginDataThunk } from '../../redux/reducers/auth.reducer';

export const LoginContainer = () => {

  const { authData, isFetched, isFetching } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const history = useHistory()
  const { login } = useAuth()
  const toast = useToast()
  const { lang, renderText } = useLang()
  const { initialTime, setInitialTime, setStartTimer } = useRedirectTimer('/')

  const onSubmitHandle = async (data) => {
    try {
      const { data: { token, userLogin, _id } } = await dispatch(sendLoginDataThunk(data)).unwrap()
      login(token, userLogin, _id)
    } catch (e) {
      toast({ title: e.title, description: e.message, status: "error", duration: 9000, isClosable: true })
    }
  }

  useEffect(() => {
    return () => {
      dispatch(clearStateAuth())
    }
  }, [history, dispatch])

  useEffect(() => {
    if (isFetched && authData.status === 200) {
      setInitialTime(3);
      setStartTimer(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetched])

  if (isFetched && authData.status === 200) {
    return <CAlert
      alertTitle={renderText(lang).AUTH.LOGIN.ALERT_SUCCESS_LOGIN_TITLE}
      alertDescription={renderText(lang).AUTH.LOGIN.ALERT_SUCCESS_LOGIN_DESC}
      forAuth={true}
      initialTime={initialTime}
    />
  }

  return <Login onSubmitHandle={onSubmitHandle} isFetching={isFetching} />
}


