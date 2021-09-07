import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useGetCurrentUserMutation } from '../redux/api/api'
import { setAppIsReady } from '../redux/reducers/app.reducer'
import { setCurrentUser } from '../redux/reducers/auth.reducer'
import { RootState } from '../redux/store'
import { useMutate } from './mutate.hook'

/*
 *=== СХЕМА РАБОТЫ ХУКА АВТОРИЗАЦИИ ===* 
 При использовании асинхронной функции login отправляем запрос
 о получении актуальных данных текущего пользователя
 записываем эти данные в локальное хранилище и если пользователь
 авторизован (есть токен в localstorage), то на каждую инициализацию приложения
 получаем актуальные данные и записываем в state
 ** Если юзер не авторизован, то запрос не отправляется **
 ==========
*/

const storageName: string = 'currentUser'

export const useAuth = () => {

  const {
    currentUser: {
      userLogin,
      accessLevel,
      userPhoto,
      token,
      _id
    },
    isAuthenticated,
    isAppReady
  } = useSelector((state: RootState) => ({
    currentUser: state.auth.currentUser,
    isAuthenticated: state.auth.isAuthenticated,
    isAppReady: state.app.isAppReady
  }))


  const [getCurrentUser] = useGetCurrentUserMutation()
  const { asyncMutate } = useMutate()
  const dispatch = useDispatch()
  const history = useHistory()

  const login = useCallback(async (token: string, userLogin: string, id: string) => {
    try {
      const response = await asyncMutate(getCurrentUser({ userLogin, token }))
      dispatch(setCurrentUser({ currentUser: { ...response, token } }))

      localStorage.setItem(storageName, JSON.stringify({
        token, userLogin, id
      }))
    } catch (e) {
      localStorage.removeItem(storageName)
    }
  }, [dispatch, asyncMutate, getCurrentUser])

  const logout = useCallback(() => {
    dispatch(setCurrentUser({ currentUser: {} }))
    localStorage.removeItem(storageName)
    history.go(0)
  }, [dispatch, history])

  useEffect(() => {
    if (!isAppReady) {
      const loginOnAppInit = async () => {
        const data = JSON.parse(localStorage.getItem(storageName) || '{}')
        if (data && data.token && !isAuthenticated) {
          await login(data.token, data.userLogin, data.id)
        }
        dispatch(setAppIsReady(true))
      }
      loginOnAppInit()
    }

  }, [login, dispatch, isAuthenticated, isAppReady])

  return {
    login, // func
    logout, // func 
    token, // string
    _id, // string
    isAppReady, // bool
    isAuthenticated, // bool
    userLogin, // string
    accessLevel, // number
    userPhoto // string
  } as const
}