import React, { useEffect, useRef, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useNavigate, useParams } from 'react-router-dom'
import { getSuperheroe } from '../../services/getSuperheroe'
import { putSuperheroes } from '../../services/putSuperheroes'
import { deleteSuperheroe } from '../../services/deleteSuperheroes'
import { Carousels } from '../Carrousel/index' // ⚠️ Revisa si tu carpeta es "Carousel" o "Carrousel"
import './index.css'
import Swal from 'sweetalert2'

export function Template() {
  const [superheroe, setSuperheroe] = useState([])
  const [loading, setLoading] = useState(false)
  const { id } = useParams()
  const form = useRef()
  const navigate = useNavigate()

  useEffect(() => {
    getSuperheroe(id).then(res => {
      setSuperheroe(res)
      setLoading(true)
    })
  }, [id])

  const handleSubmit = e => {
    e.preventDefault()

    const formData = new FormData(form.current)
    const capitalizedFormData = Object.fromEntries(
      Array.from(formData.entries()).map(([name, value]) => [name, value]),
    )

    console.log('capitale', capitalizedFormData)

    putSuperheroes(id, capitalizedFormData).then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Personaje modificado con éxito',
        showConfirmButton: false,
        timer: 1500,
      })
    })
  }

  const handleDelete = () => {
    deleteSuperheroe(id)
      .then(() => {
        navigate('/')
        Swal.fire({
          icon: 'success',
          title: 'Personaje eliminado con éxito',
          showConfirmButton: false,
          timer: 1500,
        })
      })
      .catch(console.error)
  }

  return loading ? (
    <div className="superheroe">
      {/* <img src={superheroe.images} alt="" /> */}
      <Carousels
        name="images"
        className="imagen w-100"
        defaultValue={superheroe.nombre}
        imagen={superheroe.images}
      />
      <Form className="superheroe-data" ref={form} onSubmit={handleSubmit}>
        <Form.Group className="inputs mb-3" controlId="formBasicEmail">
          <Form.Label className="fw-bold">Nombre</Form.Label>
          <Form.Control
            name="nombre"
            defaultValue={superheroe.nombre}
            type="text"
            className="form-control"
          />
          <Form.Label className="fw-bold">Nombre Personaje</Form.Label>
          <Form.Control
            name="nombre_pers"
            defaultValue={superheroe.nombre_pers}
            type="text"
            className="form-control"
          />
          <Form.Label className="fw-bold">Año Aparicion</Form.Label>
          <Form.Control
            name="año"
            defaultValue={superheroe.año_aparicion}
            type="text"
            className="form-control"
          />
          <Form.Label className="fw-bold">Casa</Form.Label>
          <Form.Control
            name="casa"
            defaultValue={superheroe.casa}
            as="select"
            className="form-control">
            <option value="marvel">Marvel</option>
            <option value="dc">DC</option>
          </Form.Control>
          <Form.Label className="fw-bold">Biografia</Form.Label>
          <textarea
            name="biografia"
            defaultValue={superheroe.biografia}
            type="text"
            className="form-control"
          />
          <Form.Label className="fw-bold">Equipamiento</Form.Label>
          <Form.Control
            name="equipamiento"
            defaultValue={superheroe.equipamiento}
            type="text"
            className="form-control"
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Editar
        </Button>
        <Button
          className="boton-eliminar"
          variant="secondary"
          onClick={handleDelete}>
          Eliminar
        </Button>
      </Form>
    </div>
  ) : (
    <p>Cargando...</p>
  )
}
