import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IPost } from '../../models/post.interface'
import { IUser } from '../../models/user.interface'
import { ILoginResponse, ILoginSubmit } from '../../types/auth.interface'

interface Itest {
  data: FormData,
  token: string
}


export const queryApi = createApi({
  reducerPath: 'queryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/'
  }),
  keepUnusedDataFor: 0,
  endpoints: (builder) => ({
    /*=== Получение пользователей ===*/
    getUserByLogin: builder.query<IUser, string>({
      query: (query) => `users/${query}`,
    }),
    getUserByLoginLazy: builder.mutation<IUser, string>({
      query: (query) => `users/${query}`,
    }),
    getAllUsers: builder.query<IUser[], string>({
      query: (token) => ({ url: `users`, headers: { 'Authorization': `Bearer ${token}` } }),
    }),
    /*=== Авторизация ===*/
    registration: builder.mutation<IUser, FormData>({
      query: (data) => ({ url: 'auth/registration', method: 'POST', body: data }),
    }),
    sendLogin: builder.mutation<ILoginResponse, ILoginSubmit>({
      query: (data) => ({ url: 'auth/login', method: 'POST', body: data }),
    }),
    /*=== Получение постов и добавление ===*/
    getAllPosts: builder.query<IPost[], string>({
      query: (query) => `posts/${query}`,
    }),
    createPost: builder.mutation<IPost, Itest>({
      query: ({data, token}) => ({ url: 'posts/createpost', method: 'POST', body: data, headers: { 'Authorization': `Bearer ${token}` } }),
    }),
  }),
})


export const {
  /*=== Получение пользователей ===*/
  useGetUserByLoginQuery,
  useGetUserByLoginLazyMutation,
  useGetAllUsersQuery,
  /*=== Авторизация ===*/
  useRegistrationMutation,
  useSendLoginMutation,
  /*=== Получение постов ===*/
  useGetAllPostsQuery,
  useCreatePostMutation
} = queryApi