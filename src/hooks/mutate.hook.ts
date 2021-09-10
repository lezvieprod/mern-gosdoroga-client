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
  const toastIdError: string = 'mutateError'
  const toastIdSuccess: string = 'mutateSuccess'


  const asyncMutate = useCallback(async (callback, withToast: boolean = false) => {
    try {
      const response = await callback.unwrap()
      if (withToast) {
        toast({
          id: toastIdSuccess,
          title: response.title,
          description: response.message,
          status: "success",
          duration: 5000,
          isClosable: true
        })
      }
      return response
    } catch ({ data }) {
      if (isApiError(data)) {
        toast({ id: toastIdError, title: data.title, description: data.message, status: "error", duration: 5000, isClosable: true })
        return Promise.reject<IRequestError>({ data })
      } else {
        toast({
          id: toastIdError,
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


