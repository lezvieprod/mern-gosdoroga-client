import { useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Reg } from '../../components/Auth/Reg';
import { CAlert } from '../../components/common/CAlert';
import { useLang } from '../../hooks/lang.hook';
import { clearStateAuth, sendRegistrationDataThunk } from '../../redux/reducers/auth.reducer';


export const RegContainer = () => {


  const { authData, isFetched, isFetching, isReject, rejectData } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const history = useHistory()

  const [initialTime, setInitialTime] = useState(0);
  const [startTimer, setStartTimer] = useState(false);
  const toast = useToast()
  const { lang, renderText } = useLang()

  /* ==== 
  Sending auth data to server
  if reject - clear state,
  ==== */
  const onSubmitHandle = (data) => {
    dispatch(sendRegistrationDataThunk(data))
    // if (rejectData) {
    //   dispatch(clearStateAuth())
    // }
  }

  /* ==== Rerender when timer updates ==== */
  useEffect(() => {
    if (initialTime > 0) {
      setTimeout(() => {
        setInitialTime(initialTime - 1);
      }, 1000);
    }

    if (initialTime === 0 && startTimer) {
      history.push('/auth/login')
      setStartTimer(false);
    }
  }, [initialTime, startTimer, history]);

  /* ==== Start timer for redirect ==== */
  useEffect(() => {
    if (isFetched && authData.status === 201) {
      setInitialTime(3);
      setStartTimer(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetched])

  /* ==== Clear state if change url path ==== */
  useEffect(() => {
    return () => {
      dispatch(clearStateAuth())
    }
  }, [history, dispatch])


  /* ==== Show toast if reject ==== */
  useEffect(() => {
    if (isReject) {
      toast({
        title: rejectData.title,
        description: rejectData.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReject, toast])

  console.log(authData);

  /* ==== If fulfilled - show alert and timer ==== */
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


