import React, { useEffect } from 'react'
import { Container } from "@chakra-ui/react";
import { NavContainer } from './containers/Nav/NavContainer';
import { useAuth } from './hooks/auth.hook';
import { Preloader } from './components/common/Preloader';
import { useRoutes } from './routes';

function App() {
  const { isAuthenticated, isAppReady, accessLevel } = useAuth()
  const routes = useRoutes(isAuthenticated, accessLevel)

  if (!isAppReady) {
    return <Preloader forInit/>
  }

  return (
    <div className="App">
      <NavContainer />
      <Container maxW={'1200px'}>
        {routes}
      </Container>
    </div>
  );
}

export default App;
