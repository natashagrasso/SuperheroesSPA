import axios from 'axios'
export const getMarvel = () => {
  return axios.get('http://localhost:3000/marvel').then(res => res.data)
}
