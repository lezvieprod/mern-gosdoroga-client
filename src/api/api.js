import * as axios from "axios";


const instance = axios.create({
  baseURL: '/',
  Headers: {
    'Content-Type': 'application/json'
  }
})


// export const usersAPI = {
//   getUserByLogin(login) {
//     return (
//       instance
//         .get(`api/users/${login}`)
//         .then(response => ({ data: response.data, status: response.status }))
//         .catch(error => {
//           return Promise.reject({ data: error.response.data, status: error.response.status });
//         })
//     )
//   },
// }
