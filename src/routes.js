import { Container } from '@chakra-ui/react';
import React from 'react'
import { Route, Switch } from "react-router-dom";
import { LoginContainer } from './containers/Auth/LoginContainer';
import { RegContainer } from './containers/Auth/RegContainer';


export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path={'/'}>
          <Container mt={4} p={0}>
            test
          </Container>
        </Route>
      </Switch>
    )
  }

  return (
    <Switch>
      <Route path={'/auth/login'}>
        <Container mt={4} p={0}>
          <LoginContainer />
        </Container>
      </Route>
      <Route path={'/auth/registration'}>
        <Container mt={4} p={0}>
          <RegContainer />
        </Container>
      </Route>
    </Switch>

  )
}