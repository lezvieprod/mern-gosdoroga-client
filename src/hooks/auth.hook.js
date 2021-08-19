import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { setAppIsReady } from '../redux/reducers/app.reducer'
import { setCurrentUser } from '../redux/reducers/auth.reducer'

import { getUserByLoginThunk } from '../redux/reducers/auth.reducer'

const storageName = 'currentUser'

export const useAuth = () => {
  const { token, userId, isAuthenticated, isAppReady } = useSelector(state => ({
    token: state.auth.token,
    userId: state.auth.userId,
    isAuthenticated: state.auth.isAuthenticated,
    isAppReady: state.app.isAppReady
  }))

  const dispatch = useDispatch()
  const history = useHistory()

  const login = useCallback((token, userLogin, id) => {
    console.log(token, userLogin, id);
    dispatch(setCurrentUser(token, userLogin, id))

    localStorage.setItem(storageName, JSON.stringify({
      token, userLogin, id
    }))
  }, [dispatch])

  const logout = useCallback(() => {
    dispatch(setCurrentUser({ token: null, userId: null }))
    localStorage.removeItem(storageName)
    history.go(0) // Переделать на использование без перезагрузки
  }, [dispatch])

  useEffect(() => {
    const loginOnAppInit = async () => {
      const data = JSON.parse(localStorage.getItem(storageName))
      
      if (data && data.token && !isAuthenticated) {
        login(data.token, data.userLogin, data.id)
        await dispatch(getUserByLoginThunk(data.userLogin))
      }

      dispatch(setAppIsReady(true))
    }
    loginOnAppInit()
  }, [login, dispatch])


  return { login, logout, token, userId, isAppReady, isAuthenticated }
}