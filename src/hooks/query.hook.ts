import { useToast } from '@chakra-ui/react';
import { useEffect } from 'react'
import { IRequestError } from '../types/error.interface';

type UseQueryResult<T, P> = {
  originalArgs?: unknown
  data?: T
  error?: {
    data: P
  }
  requestId?: string
  endpointName?: string
  startedTimeStamp?: number
  fulfilledTimeStamp?: number
  isUninitialized: boolean
  isLoading: boolean
  isFetching: boolean
  isSuccess: boolean
  isError: boolean
  refetch: () => void
}

type UseQueryOptions = {
  pollingInterval?: number
  refetchOnReconnect?: boolean
  refetchOnFocus?: boolean
  skip?: boolean
  refetchOnMountOrArgChange?: boolean | number
  selectFromResult?: (result: any /* UseQueryStateDefaultResult */) => any
}

export const useAsyncApi = <T, R = string>(hook: Function, query?: R, params?: UseQueryOptions) => {

  const toast = useToast()
  const toastId: string = 'apiError'
  const { data, error, isLoading, isFetching, refetch }: UseQueryResult<T, IRequestError> = hook(query, params)

  useEffect(() => {
    if (error && !toast.isActive(toastId)) {
      toast({
        id: toastId,
        title: error.data.title,
        description: error.data.message,
        status: "error",
        duration: 5000,
        isClosable: true
      })
    }
  }, [toast, error])

  return { data, error, isLoading, isFetching, refetch } as const
}


