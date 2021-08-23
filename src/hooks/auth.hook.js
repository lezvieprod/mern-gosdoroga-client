import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { setAppIsReady } from '../redux/reducers/app.reducer'
import { setCurrentUser } from '../redux/reducers/auth.reducer'
import { getUserByLoginThunk } from '../redux/reducers/auth.reducer'


/*
 *=== СХЕМА РАБОТЫ ХУКА ===* 
 -- Авторизация
 При использовании асинхронной функции login отправляем запрос
 о получении актуальных данных текущего пользователя
 записываем эти данные в локальное хранилище и если пользователь
 авторизован (есть токен в localstorage), то на каждую инициализацию приложения
 получаем актуальные данные и записываем в state
 ** Если юзер не авторизован, то запрос не отправляется **
 ==========
*/

const storageName = 'currentUser'

export const useAuth = () => {

  const { currentUser: { userLogin, accessLevel }, token, userId, isAuthenticated, isAppReady } = useSelector(state => ({
    currentUser: state.auth.currentUser,
    token: state.auth.token,
    userId: state.auth.userId,
    isAuthenticated: state.auth.isAuthenticated,
    isAppReady: state.app.isAppReady
  }))

  const dispatch = useDispatch()
  const history = useHistory()

  const login = useCallback(async (token, userLogin, id) => {
    await dispatch(getUserByLoginThunk(userLogin))
    dispatch(setCurrentUser({ token, userId: id }))

    localStorage.setItem(storageName, JSON.stringify({
      token, userLogin, id
    }))
  }, [dispatch])

  const logout = useCallback(() => {
    dispatch(setCurrentUser({ token: null, userId: null }))
    localStorage.removeItem(storageName)
    history.go(0)
  }, [dispatch])

  useEffect(() => {
    const loginOnAppInit = async () => {
      const data = JSON.parse(localStorage.getItem(storageName))
      if (data && data.token && !isAuthenticated) {
        await login(data.token, data.userLogin, data.id)
      }
      dispatch(setAppIsReady(true))
    }
    loginOnAppInit()
  }, [login, dispatch, isAuthenticated])

  return {
    login, // func
    logout, // func 
    token, // string
    userId, // string
    isAppReady, // bool
    isAuthenticated, // bool
    userLogin, // string
    accessLevel // number
  }
}