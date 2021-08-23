import * as axios from "axios";


const instance = axios.create({
  baseURL: '/',
  Headers: {
    'Content-Type': 'application/json'
  }
})

export const authAPI = {
  sendRegistrationData(data) {
    return (
      instance
        .post(`api/auth/registration`, data)
        .then(response => ({ data: response.data, status: response.status }))
    )
  },
  sendLoginData(data) {
    return (
      instance
        .post(`api/auth/login`, data)
        .then(response => ({ data: response.data, status: response.status }))
    )
  },
}

export const usersAPI = {
  getUserByLogin(login) {
    return (
      instance
        .get(`api/users/${login}`)
        .then(response => ({ data: response.data, status: response.status }))
    )
  },
  getUsers(token) {
    return (
      instance
        .get(`api/users`, {
          headers: {
            Authorization: 'Bearer ' + token
          }
        })
        .then(response => ({ data: response.data, status: response.status }))
    )
  }

}
