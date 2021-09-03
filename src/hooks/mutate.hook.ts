import { useToast } from '@chakra-ui/react';
import { useCallback } from 'react'
import { IRequestError } from '../types/error.interface';
import { isApiError } from '../utils/fetch';

export const useMutate = () => {

  const toast = useToast()

  const asyncMutate = useCallback(async (callback) => {
    try {
      return await callback.unwrap()
    } catch ({ data }) {
      if (isApiError(data)) {
        toast({ title: data.title, description: data.message, status: "error", duration: 5000, isClosable: true })
        return Promise.reject<IRequestError>({ data })
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
  }, [toast])

  return { asyncMutate } as const
}


