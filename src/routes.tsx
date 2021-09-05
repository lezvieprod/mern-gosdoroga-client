import { Container } from '@chakra-ui/react';
import React, { lazy } from 'react'
import { Route, Switch } from "react-router-dom";

import { AdminLayout } from './admin/layouts/Admin.layout';
import { AuthLayout } from './layouts/Auth.layout';
import { MainLayout } from './layouts/Main.layout';

import { PageUndefined } from './components/common/PageUndefined';
import PostsContainer from './containers/Posts/PostsContainer';
import { ProfileContainer } from './containers/Profile/ProfileContainer';

const LoginContainer = lazy(() => import('./containers/Auth/LoginContainer'));
const RegContainer = lazy(() => import('./containers/Auth/RegContainer'));
const UsersContainer = lazy(() => import('./admin/containers/Users/UsersContainer'));
const CreatePostContainer = lazy(() => import('./containers/CreatePost/CreatePostContainer'));


interface IRoutesProps {
  isAuthenticated: boolean,
  accessLevel: number
}

interface IAdminRoute {
  children: React.ReactNode,
  isAuthenticated: boolean,
  accessLevel: number,
  [rest: string]: any
}

export const Routes: React.FC<IRoutesProps> = ({ isAuthenticated, accessLevel }) => {
  return (
    <Switch>
      <Route path={'/auth/login'}>
        <AuthLayout>
          {isAuthenticated ? 'Вы уже авторизованы' : <LoginContainer />}
        </AuthLayout>
      </Route>
      <Route path={'/auth/registration'}>
        <AuthLayout>
          {isAuthenticated ? 'Вы уже авторизованы' : <RegContainer />}
        </AuthLayout>
      </Route>
      <Route exact path={'/'}>
        <MainLayout>
          <PostsContainer />
        </MainLayout>
      </Route>
      <Route exact path={'/createpost'}>
        <MainLayout>
          <Container mt={10} p={0} variant={'modal'}>
            <CreatePostContainer />
          </Container>
        </MainLayout>
      </Route>
      <Route path={'/profile/:userLogin'}>
        <MainLayout>
          <ProfileContainer />
        </MainLayout>
      </Route>
      <AdminRoute exact path={'/admin'} isAuthenticated={isAuthenticated} accessLevel={accessLevel}>
        <AdminLayout>
          Главная страница админ панели
        </AdminLayout>
      </AdminRoute>
      <AdminRoute exact path={'/admin/users'} isAuthenticated={isAuthenticated} accessLevel={accessLevel}>
        <AdminLayout>
          <UsersContainer />
        </AdminLayout>
      </AdminRoute>
      <AdminRoute path={'/admin/posts'} isAuthenticated={isAuthenticated} accessLevel={accessLevel}>
        <AdminLayout>
          posts
        </AdminLayout>
      </AdminRoute>
      <Route exact path={'*'}>
        <Container my={12} p={0}>
          <PageUndefined />
        </Container>
      </Route>
    </Switch>

  )
}

const AdminRoute: React.FC<IAdminRoute> = ({ children, isAuthenticated, accessLevel, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => isAuthenticated && accessLevel! >= 3 ? children : <PageUndefined />}
    />
  );
}