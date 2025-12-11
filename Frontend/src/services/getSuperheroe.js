//Para obtener uno solo por ID
import axios from 'axios'
export const getSuperheroe = id => {
  return axios
    .get(`http://localhost:3000/superheroe/${id}`)
    .then(res => res.data)
}
