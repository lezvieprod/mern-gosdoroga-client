import React from 'react'
import { useAuth } from './hooks/auth.hook';
import { Preloader } from './components/common/Preloader';
import { Routes } from './routes';

export const App: React.FC = () => {
  const { isAuthenticated, isAppReady, accessLevel } = useAuth()
  
  if (!isAppReady) return <Preloader forInit />
  
  return <Routes isAuthenticated={isAuthenticated} accessLevel={accessLevel} />
}