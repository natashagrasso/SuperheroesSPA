//para editar
import axios from 'axios'
export const putSuperheroes = (id, data) => {
  return axios
    .put(`http://localhost:3000/edit/${id}`, data)
    .then(res => res.data)
}
