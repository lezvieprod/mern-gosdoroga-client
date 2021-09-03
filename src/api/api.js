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
        .post(`api/auth/registration`, data, {
          header: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(response => ({ data: response.data, status: response.status }))
        .catch(error => {
          return Promise.reject({ data: error.response.data, status: error.response.status });
        })
    )
  },
  sendLoginData(data) {
    return (
      instance
        .post(`api/auth/login`, data)
        .then(response => {
          return { data: response.data, status: response.status }
        })
        .catch(error => {
          return Promise.reject({ data: error.response.data, status: error.response.status });
        })
    )
  },
}

export const usersAPI = {
  getUserByLogin(login) {
    return (
      instance
        .get(`api/users/${login}`)
        .then(response => ({ data: response.data, status: response.status }))
        .catch(error => {
          return Promise.reject({ data: error.response.data, status: error.response.status });
        })
    )
  },
  

}
