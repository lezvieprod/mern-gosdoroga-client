import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IUser } from '../../models/user.interface'
import { ILoginResponse, ILoginSubmit } from '../../types/auth.interface'

export const queryApi = createApi({
  reducerPath: 'queryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/'
  }),
  keepUnusedDataFor: 0,
  endpoints: (builder) => ({
    getUsersByLogin: builder.query<IUser, string>({
      query: (query) => `users/${query}`,
    }),
    getAllUsers: builder.query<IUser[], string>({
      query: (token) => ({ url: `users`, headers: { 'Authorization': `Bearer ${token}` } }),
    }),
    registration: builder.mutation<IUser, FormData>({
      query: (data) => ({
        url: 'auth/registration',
        method: 'POST',
        body: data,
      }),
    }),
    sendLogin: builder.mutation<ILoginResponse, ILoginSubmit>({
      query: (data) => ({
        url: 'auth/login',
        method: 'POST',
        body: data,
      }),
    }),
  }),
})


export const { 
  useGetUsersByLoginQuery, 
  useGetAllUsersQuery, 
  useRegistrationMutation,
  useSendLoginMutation
 } = queryApi