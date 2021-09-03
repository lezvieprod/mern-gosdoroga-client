import { useToast } from '@chakra-ui/react';
import { useEffect } from 'react'


type UseQueryOptions = {
  pollingInterval?: number
  refetchOnReconnect?: boolean
  refetchOnFocus?: boolean
  skip?: boolean
  refetchOnMountOrArgChange?: boolean | number
  selectFromResult?: (result: any /* UseQueryStateDefaultResult */) => any
}

export const useAsyncApi = <T>(hook: Function, query?: T, params?: UseQueryOptions) => {

  const toast = useToast()
  const toastId: string = 'apiError'

  const { data, error, isLoading, isFetching, refetch } = hook(query)

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


