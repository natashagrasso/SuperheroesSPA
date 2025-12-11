//para borrar
import axios from 'axios'
export const deleteSuperheroe = id => {
  return axios
    .delete(`http://localhost:3000/delete/${id}`)
    .then(res => res.data)
}
