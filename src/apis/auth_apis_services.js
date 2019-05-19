import http from '@/utils/http-common'

export default {
  login(username, password) {
    return http.post('/account/login/', {'email': username, 'password': password})
      .then(response => {
        return response.data
      })
  },
  registration(first_name,last_name,email, password) {
    return http.post('/account/registration/', JSON.stringify({'first_name':first_name,'last_name':last_name,'email': email, 'password': password}))
      .then(response => {
        return response.data
      })
  },
  user_list() {
    return http.get('/account/user-list/')
      .then(response => {
        return response.data
      })
  },
  useravailibility(email) {
    return http.post('/account/user-availibility/', JSON.stringify({'email': email}))
      .then(response => {
        return response.data
      })
  },
}
