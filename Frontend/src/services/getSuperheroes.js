import axios from 'axios'
export const getSuperheroes = () => {
  return axios.get('http://localhost:3000/superheroes').then(res => res.data)
}
