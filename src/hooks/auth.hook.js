import {useState, useCallback, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAppIsReady, setCurrentUser } from '../redux/reducers/app.reducer'

const storageName = 'currentUser'

export const useAuth = () => {
  const { token, userId, isAppReady } = useSelector(state => state.app)
  const dispatch = useDispatch()

  const login = useCallback((token, userId) => {
    dispatch(setCurrentUser({token, userId}))

    localStorage.setItem(storageName, JSON.stringify({
      userId, token
    }))
  }, [])

  const logout = useCallback(() => {
    dispatch(setCurrentUser({token: null, userId: null}))
    localStorage.removeItem(storageName)
  }, [dispatch])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName))
    if (data && data.token) {
      login(data.token, data.userId)
    }
    dispatch(setAppIsReady(true))
  }, [login, dispatch])


  return {login, logout, token, userId, isAppReady}
}