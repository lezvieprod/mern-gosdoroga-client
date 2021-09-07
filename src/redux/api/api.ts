import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IPost } from '../../models/post.interface'
import { IUser } from '../../models/user.interface'
import { ILoginResponse, ILoginSubmit } from '../../types/auth.interface'

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
    getCurrentUser: builder.mutation<IUser, { userLogin: string, token: string }>({
      query: ({ userLogin, token }) => ({ url: `users/currentuser/${userLogin}`, headers: { 'Authorization': `Bearer ${token}` } }),
    }),
    /*=== Получение постов и добавление ===*/
    getAllPosts: builder.query<IPost[], string>({
      query: (userLogin) => userLogin ? `posts/${userLogin}` : `posts`,
    }),
    getPost: builder.query<IPost, {postId: string, slugTitle: string}>({
      query: ({postId, slugTitle}) => `posts/${postId}/${slugTitle}`,
    }),
    createPost: builder.mutation<IPost, { data: FormData, token: string }>({
      query: ({ data, token }) => ({ url: 'posts/createpost', method: 'POST', body: data, headers: { 'Authorization': `Bearer ${token}` } }),
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
  useGetCurrentUserMutation,
  /*=== Получение постов ===*/
  useGetAllPostsQuery,
  useCreatePostMutation,
  useGetPostQuery
} = queryApi