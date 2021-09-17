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
  tagTypes: ['Posts', 'Users'],
  endpoints: (builder) => ({
    /*=== Пользователи ===*/
    getUserByLogin: builder.query<IUser, string>({
      query: (query) => `users/${query}`,
    }),
    getUserByLoginLazy: builder.mutation<IUser, string>({
      query: (query) => `users/${query}`,
    }),
    getAllUsers: builder.query<{ users: IUser[], total: number }, { token: string, page: number, limit: number, sort: string }>({
      query: ({ token, page, limit, sort }) => {
        return { url: `users?page=${page}&limit=${limit}&sort=${sort}`, headers: { 'Authorization': `Bearer ${token}` } }
      },
      providesTags: (result) =>
      result
        ? [...result.users.map(({ _id }) => ({ type: 'Users' as const, _id })), { type: 'Users', id: 'USERS_LIST' }]
        : [{ type: 'Users', id: 'USERS_LIST' }],
    }),
    deleteUser: builder.mutation<any, { userId: number, token: string }>({
      query: ({ userId, token }) => ({ url: `users/delete/${userId}`, method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } }),
      invalidatesTags: ['Users'],
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
    getAllPosts: builder.query<{ posts: IPost[], total: number }, { authorLogin: string, page: number, limit: number, sort: string }>({
      query: ({ authorLogin, page, limit, sort }) => {
         /*  Отправляет запрос либо с логином автора, либо без */
        return `posts${authorLogin ? '/' + authorLogin : ''}?page=${page}&limit=${limit}&sort=${sort}`
      },
      providesTags: (result) =>
        result
          ? [...result.posts.map(({ _id }) => ({ type: 'Posts' as const, _id })), { type: 'Posts', id: 'LIST' }]
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
    /*=== Счетчики ===*/
    getAllCounters: builder.query<{ usersTotal: number, postsTotal: number }, { token: string }>({
      query: (token) => ({ url: `counters`, headers: { 'Authorization': `Bearer ${token}` } }),
    }),
  }),
})

export const {
  /*=== Пользователи ===*/
  useGetUserByLoginQuery,
  useGetUserByLoginLazyMutation,
  useGetAllUsersQuery,
  useDeleteUserMutation,
  /*=== Авторизация ===*/
  useRegistrationMutation,
  useSendLoginMutation,
  useGetCurrentUserMutation,
  /*=== Посты ===*/
  useGetAllPostsQuery,
  useCreatePostMutation,
  useGetPostQuery,
  useDeletePostMutation,
  useEditPostMutation,
  /*=== Счетчики ===*/
  useGetAllCountersQuery
} = queryApi