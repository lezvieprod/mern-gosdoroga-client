import React from 'react'
import { Container } from "@chakra-ui/react";
import { NavContainer } from './containers/Nav/NavContainer';
import { Route } from 'react-router-dom';
import { LoginContainer } from './containers/Auth/LoginContainer';
import { RegContainer } from './containers/Auth/RegContainer';
import { useDispatch, useSelector } from 'react-redux';


function App() {

  const {isAppReady, isAuthenticated} = useSelector(state => state.app)
  const dispatch = useDispatch()



  return (
    <div className="App">
      <NavContainer />
      <Container maxW={'1200px'}>
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
      </Container>
    </div>
  );
}

export default App;
