import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IPost } from '../../models/post.interface'
import { IUser } from '../../models/user.interface'
import { ILoginResponse, ILoginSubmit } from '../../types/auth.interface'
import { IGetPostQuery } from '../../types/post.interface'

export const queryApi = createApi({
  reducerPath: 'queryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/'
  }),
  keepUnusedDataFor: 0,
  tagTypes: ['Posts'],
  endpoints: (builder) => ({
    /*=== Пользователи ===*/
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
    /*=== Посты ===*/
    getAllPosts: builder.query<IPost[], string>({
      query: (userLogin) => userLogin ? `posts/${userLogin}` : `posts`,
      providesTags: (result) =>
        result
          ? [...result.map(({ _id }) => ({ type: 'Posts' as const, _id })), { type: 'Posts', id: 'LIST' }]
          : [{ type: 'Posts', id: 'LIST' }],
    }),
    getPost: builder.query<IPost, IGetPostQuery>({
      query: ({ postId, slugTitle }) => `posts/${postId}/${slugTitle}`,
    }),
    createPost: builder.mutation<IPost, { data: FormData, token: string }>({
      query: ({ data, token }) => ({ url: 'posts/createpost', method: 'POST', body: data, headers: { 'Authorization': `Bearer ${token}` } }),
    }),
    deletePost: builder.mutation<any, { postId: string, token: string }>({
      query: ({ postId, token }) => ({ url: `posts/delete/${postId}`, method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } }),
      invalidatesTags: ['Posts'],
    }),
    editPost: builder.mutation<IPost, { editedData: FormData, token: string, editedPostId: string }>({
      query: ({ editedData, token, editedPostId }) => ({ url: `posts/edit/${editedPostId}`, method: 'PUT', body: editedData, headers: { 'Authorization': `Bearer ${token}` } }),
    }),
  }),
})


export const {
  /*=== Пользователи ===*/
  useGetUserByLoginQuery,
  useGetUserByLoginLazyMutation,
  useGetAllUsersQuery,
  /*=== Авторизация ===*/
  useRegistrationMutation,
  useSendLoginMutation,
  useGetCurrentUserMutation,
  /*=== Посты ===*/
  useGetAllPostsQuery,
  useCreatePostMutation,
  useGetPostQuery,
  useDeletePostMutation,
  useEditPostMutation
} = queryApi