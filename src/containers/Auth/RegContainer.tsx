import React, { useEffect, useState } from 'react';
import { Reg } from '../../components/Auth/Reg';
import { CAlert } from '../../components/common/CAlert';
import { useLang } from '../../hooks/lang.hook';
import { useMutate } from '../../hooks/mutate.hook';
import { useRedirectTimer } from '../../hooks/timer.hook';
import { useRegistrationMutation } from '../../redux/api/api';

const RegContainer: React.FC = () => {

  const { initialTime, setInitialTime, setStartTimer } = useRedirectTimer('/auth/login')
  const { lang, renderText } = useLang()
  const [isRegistered, setRegistered] = useState<boolean>(false)
  const [registration, { isLoading }] = useRegistrationMutation()
  const { asyncMutate } = useMutate()

  const onSubmitHandle = async (data: FormData) => {
    try {
      await asyncMutate(registration(data))
      setRegistered(true)
    } catch (e) { }
  }

  useEffect(() => {
    if (isRegistered) {
      setInitialTime(3);
      setStartTimer(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRegistered])

  if (isRegistered) {
    return <CAlert
      alertTitle={renderText(lang).AUTH.REG.ALERT_SUCCESS_REG_TITLE}
      alertDescription={renderText(lang).AUTH.REG.ALERT_SUCCESS_REG_DESC}
      forAuth={true}
      initialTime={initialTime}
    />
  }

  return <Reg onSubmitHandle={onSubmitHandle} isLoading={isLoading} />

}

export default RegContainer;

