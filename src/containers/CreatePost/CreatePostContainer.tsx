import React, { useEffect, useState } from 'react';
import { CAlert } from '../../components/common/CAlert';
import { CreatePost } from '../../components/CreatePost/CreatePost';
import { useAuth } from '../../hooks/auth.hook';
import { useMutate } from '../../hooks/mutate.hook';
import { useRedirectTimer } from '../../hooks/timer.hook';
import { useCreatePostMutation } from '../../redux/api/api';

const CreatePostContainer: React.FC = () => {

  const { initialTime, setInitialTime, setStartTimer } = useRedirectTimer('/')
  const [createPost, { isLoading }] = useCreatePostMutation()
  const { asyncMutate } = useMutate()
  const { token } = useAuth()
  const [isPostAdded, setPostAdded] = useState<boolean>(false)


  useEffect(() => {
    if (isPostAdded) {
      setInitialTime(2);
      setStartTimer(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPostAdded])

  const onCreatePostHandle = async (data: FormData) => {
    if (token) {
      await asyncMutate(createPost({ data, token }), true)
      setPostAdded(true)
    }
  }

  if (isPostAdded) {
    return <CAlert
      alertTitle={'Файл успешно добавлен'}
      alertType={'info'}
      alertDescription={'Переход на страницу постов...'}
      initialTime={initialTime}
    />
  }

  return <CreatePost onCreatePostHandle={onCreatePostHandle} isLoading={isLoading} />
}


export default CreatePostContainer