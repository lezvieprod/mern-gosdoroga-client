import { useToast } from '@chakra-ui/react';
import { useCallback } from 'react'
import { useDispatch } from 'react-redux';

export const useThunk = () => {

  const dispatch = useDispatch()
  const toast = useToast()

  const asyncThunk = useCallback(async (callback) => {
    try {
      return await dispatch(callback).unwrap()
    } catch (e) {
      if (e && typeof e === 'object') {
        toast({ title: e.title, description: e.message, status: "error", duration: 5000, isClosable: true })
      } else {
        toast({
          title: 'Неопознанная ошибка',
          description: 'При запросе произошла критическая ошибка',
          status: "error",
          duration: 5000,
          isClosable: true
        })
      }
    }
  }, [toast, dispatch])

  return { asyncThunk }
}


