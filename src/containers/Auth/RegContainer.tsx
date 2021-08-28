import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Reg } from '../../components/Auth/Reg';
import { CAlert } from '../../components/common/CAlert';
import { useLang } from '../../hooks/lang.hook';
import { useThunk } from '../../hooks/thunk.hook';
import { useRedirectTimer } from '../../hooks/timer.hook';
import { clearStateAuth, sendRegistrationDataThunk } from '../../redux/reducers/auth.reducer';
import { RootState } from '../../redux/store';
import { IRegSubmit } from '../../types/auth.interface';

const RegContainer = () => {

  const { isFetched, isFetching, isReject } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()
  const history = useHistory()
  const { initialTime, setInitialTime, setStartTimer } = useRedirectTimer('/auth/login')
  const { lang, renderText } = useLang()
  const { asyncThunk } = useThunk()

  const onSubmitHandle = async (data: IRegSubmit) => {
    try {
      await asyncThunk(sendRegistrationDataThunk(data))
    } catch (e) { }
  }

  useEffect(() => {
    if (isFetched && !isReject) {
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

  if (isFetched && !isReject) {
    return <CAlert
      alertTitle={renderText(lang).AUTH.REG.ALERT_SUCCESS_REG_TITLE}
      alertDescription={renderText(lang).AUTH.REG.ALERT_SUCCESS_REG_DESC}
      forAuth={true}
      initialTime={initialTime}
    />
  }

  return <Reg onSubmitHandle={onSubmitHandle} isFetching={isFetching} />

}

export default RegContainer;

