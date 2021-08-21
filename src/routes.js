import { Container } from '@chakra-ui/react';
import React from 'react'
import { Route, Switch } from "react-router-dom";
import { UsersContainer } from './admin/containers/Users/UsersContainer';
import { AdminLayout } from './admin/layouts/Admin.layout';
import { PageUndefined } from './components/common/PageUndefined';
import { LoginContainer } from './containers/Auth/LoginContainer';
import { RegContainer } from './containers/Auth/RegContainer';
import { AuthLayout } from './layouts/Auth.layout';
import { MainLayout } from './layouts/Main.layout';


export const useRoutes = (isAuthenticated, accessLevel) => {
  return (
    <Switch>
      <Route path={'/auth/login'}>
        <AuthLayout>
          {
            isAuthenticated
              ? 'Вы уже авторизованы'
              : <LoginContainer />
          }
        </AuthLayout>
      </Route>
      <Route path={'/auth/registration'}>
        <AuthLayout>
          {
            isAuthenticated
              ? 'Вы уже авторизованы'
              : <RegContainer />
          }
        </AuthLayout>
      </Route>
      <Route exact path={'/'}>
        <MainLayout>
          Главная страница
        </MainLayout>
      </Route>
      <Route path={'/posts'}>
        <MainLayout>
          posts
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

const AdminRoute = ({ children, isAuthenticated, accessLevel, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => isAuthenticated && accessLevel >= 3 ? children : <PageUndefined />}
    />
  );
}