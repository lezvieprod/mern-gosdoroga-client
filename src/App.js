import React from 'react'
import { Container } from "@chakra-ui/react";
import { NavContainer } from './containers/Nav/NavContainer';
import { Route } from 'react-router-dom';
import { LoginContainer } from './containers/Auth/LoginContainer';
import { RegContainer } from './containers/Auth/RegContainer';


function App() {


  return (
    <div className="App">
      <NavContainer />
      <Container maxW={'1200px'}>
        <Route path={'/auth/login'}>
          <LoginContainer/>
        </Route>
        <Route path={'/auth/registration'}>
          <RegContainer/>
        </Route>
      </Container>
    </div>
  );
}

export default App;
