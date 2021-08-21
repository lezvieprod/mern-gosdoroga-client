import React from 'react'
import { useAuth } from './hooks/auth.hook';
import { Preloader } from './components/common/Preloader';
import { useRoutes } from './routes';

export default function App() {
  const { isAuthenticated, isAppReady, accessLevel } = useAuth()
  const routes = useRoutes(isAuthenticated, accessLevel)

  if (!isAppReady) return <Preloader forInit />

  return routes
}