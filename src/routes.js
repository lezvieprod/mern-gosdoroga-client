import { Container } from '@chakra-ui/react';
import React from 'react'
import { Redirect, Route, Switch } from "react-router-dom";
import { PageUndefined } from './components/common/PageUndefined';
import { LoginContainer } from './containers/Auth/LoginContainer';
import { RegContainer } from './containers/Auth/RegContainer';
import { useAuth } from './hooks/auth.hook';


export const useRoutes = (isAuthenticated, accessLevel) => {
  return (
    <Switch>
      <Route path={'/auth/login'}>
        <Container mt={4} p={0}>
          {
            isAuthenticated
              ? 'Вы уже авторизованы'
              : <LoginContainer />
          }
        </Container>
      </Route>
      <Route path={'/auth/registration'}>
        <Container mt={4} p={0}>
          {
            isAuthenticated
              ? 'Вы уже авторизованы'
              : <RegContainer />
          }
        </Container>
      </Route>
      <AdminRoute exact path={'/admin/dashboard'} isAuthenticated={isAuthenticated} accessLevel={accessLevel}>
        Здесь будет админ панель
      </AdminRoute>
      <Route path={'*'}>
        <Container mt={4} p={0}>
          <PageUndefined />
        </Container>
      </Route>
    </Switch>

  )
}

const AdminRoute = ({ children, isAuthenticated, accessLevel, ...rest }) => {
  console.log(accessLevel);
  return (
    <Route
      {...rest}
      render={() => isAuthenticated && accessLevel === 5 ? children : <PageUndefined />}
    />
  );
}