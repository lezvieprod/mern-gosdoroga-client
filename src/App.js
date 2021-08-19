import React, { useEffect } from 'react'
import { Container } from "@chakra-ui/react";
import { NavContainer } from './containers/Nav/NavContainer';
import { useAuth } from './hooks/auth.hook';
import { Preloader } from './components/common/Preloader';
import { useRoutes } from './routes';
import { useDispatch, useSelector } from 'react-redux';
import { getUserByLoginThunk } from './redux/reducers/auth.reducer';


function App() {
  const { isAuthenticated, isAppReady } = useAuth()
  const routes = useRoutes(isAuthenticated)

  const dispatch = useDispatch()
  const {currentUser} = useSelector(state => state.auth)
  const state = useSelector(state => state)
  console.log('state', state);


  if (!isAppReady) {
    return <Preloader />
  }


  return (
    <div className="App">
      <NavContainer />
      <Container maxW={'1200px'}>
        {currentUser._id}
        {routes}
      </Container>
    </div>
  );
}

export default App;
