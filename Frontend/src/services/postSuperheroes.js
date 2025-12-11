//Para crea
import axios from 'axios'
export const postSuperheroes = data => {
  return axios.post('http://localhost:3000/add', data).then(res => res.data)
}
