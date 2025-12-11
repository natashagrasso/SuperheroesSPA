import axios from 'axios'
export const getDc = () => {
  return axios.get('http://localhost:3000/dc').then(res => res.data)
}
