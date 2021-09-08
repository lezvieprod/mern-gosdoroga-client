import { Container } from '@chakra-ui/react';
import React, { lazy } from 'react'
import { Route, Switch } from "react-router-dom";

import { AdminLayout } from './admin/layouts/Admin.layout';
import { AuthLayout } from './layouts/Auth.layout';
import { MainLayout } from './layouts/Main.layout';

import { PageUndefined } from './components/common/PageUndefined';

const LoginContainer = lazy(() => import('./containers/Auth/LoginContainer'));
const RegContainer = lazy(() => import('./containers/Auth/RegContainer'));
const UsersContainer = lazy(() => import('./admin/containers/Users/UsersContainer'));
const CreatePostContainer = lazy(() => import('./containers/CreatePost/CreatePostContainer'));
const PostPageContainer = lazy(() => import('./containers/PostPage/PostPageContainer'))
const ProfileContainer = lazy(() => import('./containers/Profile/ProfileContainer'))
const PostsContainer = lazy(() => import('./containers/Posts/PostsContainer'))



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
interface IAuthRoute {
  children: React.ReactNode,
  isAuthenticated: boolean,
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

      <Route exact path={'/posts/:postId-:slugTitle'}>
        <MainLayout>
          <PostPageContainer />
        </MainLayout>
      </Route>

      <AuthRoute exact path={'/createpost'} isAuthenticated={isAuthenticated}>
        <MainLayout>
          <Container p={0} variant={'modal'}>
            <CreatePostContainer />
          </Container>
        </MainLayout>
      </AuthRoute>

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

      <AdminRoute exact path={'/admin/posts'} isAuthenticated={isAuthenticated} accessLevel={accessLevel}>
        <AdminLayout>
          <PostsContainer forAdmin={true} />
        </AdminLayout>
      </AdminRoute>

      <Route exact path={'*'}>
        <PageUndefined withLayout={true} />
      </Route>

    </Switch>

  )
}

const AuthRoute: React.FC<IAuthRoute> = ({ children, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => isAuthenticated ? children : <PageUndefined isAccessError withLayout={true} />}
    />
  );
}

const AdminRoute: React.FC<IAdminRoute> = ({ children, isAuthenticated, accessLevel, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => isAuthenticated && accessLevel! >= 3 ? children : <PageUndefined isAccessError withLayout={true} />}
    />
  );
}