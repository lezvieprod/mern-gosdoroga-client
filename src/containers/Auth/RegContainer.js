import { useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Reg } from '../../components/Auth/Reg';
import { CAlert } from '../../components/common/CAlert';
import { useLang } from '../../hooks/lang.hook';
import { useRedirectTimer } from '../../hooks/timer.hook';
import { clearStateAuth, sendRegistrationDataThunk } from '../../redux/reducers/auth.reducer';


export const RegContainer = () => {

  const { authData, isFetched, isFetching } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const history = useHistory()
  const { initialTime, setInitialTime, setStartTimer } = useRedirectTimer('/auth/login')
  const toast = useToast()
  const { lang, renderText } = useLang()

  const onSubmitHandle = async (data) => {
    try {
      await dispatch(sendRegistrationDataThunk(data)).unwrap()
    } catch (e) {
      toast({ title: e.title, description: e.message, status: "error", duration: 9000, isClosable: true })
    }
  }

  useEffect(() => {
    if (isFetched && authData.status === 201) {
      setInitialTime(3);
      setStartTimer(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetched])

  useEffect(() => {
    return () => {
      dispatch(clearStateAuth())
    }
  }, [history, dispatch])

  if (isFetched && authData.status === 201) {
    return <CAlert
      alertTitle={renderText(lang).AUTH.REG.ALERT_SUCCESS_REG_TITLE}
      alertDescription={renderText(lang).AUTH.REG.ALERT_SUCCESS_REG_DESC}
      forAuth={true}
      initialTime={initialTime}
    />
  }

  return <Reg onSubmitHandle={onSubmitHandle} isFetching={isFetching} />

}


