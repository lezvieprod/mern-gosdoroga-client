import { useToast } from '@chakra-ui/react';
import { useCallback } from 'react'
import { IRequestError } from '../types/error.interface';
import { isApiError } from '../utils/fetch';

/*
 *=== ХУК ДЛЯ USEMUTATION ИЗ RTK QUERY  ===* 
 Основная задача хука - сократить кол-во написаний вывода ошибки
 ==========
*/

export const useMutate = () => {

  const toast = useToast()
  const toastId: string = 'mutateError'

  const asyncMutate = useCallback(async (callback) => {
    try {
      return await callback.unwrap()
    } catch ({ data }) {  
      if (isApiError(data)) {
        toast({ id: toastId, title: data.title, description: data.message, status: "error", duration: 5000, isClosable: true })
        return Promise.reject<IRequestError>({ data })
      } else {
        toast({
          id: toastId,
          title: 'Неопознанная ошибка',
          description: 'При запросе произошла критическая ошибка',
          status: "error",
          duration: 5000,
          isClosable: true
        })
        return Promise.reject()
      }
    }
  }, [toast])

  return { asyncMutate } as const
}


