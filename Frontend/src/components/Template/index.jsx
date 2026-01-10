import React, { useEffect, useRef, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useNavigate, useParams } from 'react-router-dom'
import { getSuperheroe } from '../../services/getSuperheroe'
import { putSuperheroes } from '../../services/putSuperheroes'
import { deleteSuperheroe } from '../../services/deleteSuperheroes'
import { Carousels } from '../Carrousel/index'
import './index.css'
import Swal from 'sweetalert2'

export function Template() {
  const [superheroe, setSuperheroe] = useState(null)
  const [loading, setLoading] = useState(true)
  const { id } = useParams()
  const form = useRef()
  const navigate = useNavigate()

  const logoMarvel =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Marvel_Logo.svg/320px-Marvel_Logo.svg.png'
  const logoDC =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/DC_Comics_logo.svg/240px-DC_Comics_logo.svg.png'

  useEffect(() => {
    // Si el ID es inválido, no intentamos cargar nada
    if (!id || id === 'undefined') {
      setLoading(false)
      return
    }

    setLoading(true)
    getSuperheroe(id)
      .then(res => {
        if (res) {
          setSuperheroe(res)
        } else {
          setSuperheroe(null)
        }
      })
      .catch(error => {
        console.error('Error al cargar:', error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [id])

  const handleSubmit = e => {
    e.preventDefault()
    const formData = new FormData(form.current)
    const capitalizedFormData = Object.fromEntries(
      Array.from(formData.entries()).map(([name, value]) => [name, value]),
    )

    putSuperheroes(id, capitalizedFormData).then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Guardado',
        text: 'Los cambios han sido aplicados.',
        showConfirmButton: false,
        timer: 1500,
      })
      setSuperheroe({ ...superheroe, ...capitalizedFormData })
    })
  }

  const handleDelete = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar',
    }).then(result => {
      if (result.isConfirmed) {
        deleteSuperheroe(id).then(() => {
          Swal.fire('Eliminado', '', 'success')
          navigate('/')
        })
      }
    })
  }

  const getLogo = () => {
    const casa = superheroe?.casa ? superheroe.casa.toLowerCase() : ''
    return casa === 'marvel' ? logoMarvel : casa === 'dc' ? logoDC : null
  }

  if (loading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary"></div>
      </div>
    )

  if (!superheroe)
    return (
      <div className="text-center mt-5">
        <h3>No se encontró el personaje.</h3>
        <Button onClick={() => navigate('/')}>Volver</Button>
      </div>
    )

  return (
    <div className="container mt-4 mb-5">
      <div className="row shadow bg-white rounded overflow-hidden">
        {/* CARRUSEL */}
        <div className="col-md-5 p-0 bg-light border-end d-flex align-items-center justify-content-center">
          <Carousels imagen={superheroe.images} />
        </div>

        {/* FORMULARIO DIRECTO */}
        <div className="col-md-7 p-4">
          <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2">
            <div className="d-flex align-items-center">
              <button
                className="btn btn-link text-dark p-0 me-3"
                onClick={() => navigate('/')}
                title="Volver al inicio">
                {/* Flecha negra para volver */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  fill="currentColor"
                  className="bi bi-arrow-left"
                  viewBox="0 0 16 16">
                  <path
                    fillRule="evenodd"
                    d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                  />
                </svg>
              </button>
              <h2 className="fw-bold mb-0 text-uppercase">Editar Perfil</h2>
            </div>
            {getLogo() && (
              <img src={getLogo()} alt="Logo" style={{ height: '40px' }} />
            )}
          </div>

          <Form className="superheroe-data" ref={form} onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold small text-muted">
                IMÁGENES (URLs)
              </Form.Label>
              <Form.Control
                name="images"
                defaultValue={superheroe.images}
                type="text"
              />
              <Form.Text className="text-muted">
                Separa con comas para cargar múltiples fotos.
              </Form.Text>
            </Form.Group>

            <div className="row">
              <div className="col-md-6 mb-3">
                <Form.Label className="fw-bold small text-muted">
                  NOMBRE
                </Form.Label>
                <Form.Control
                  name="nombre"
                  defaultValue={superheroe.nombre}
                  type="text"
                />
              </div>
              <div className="col-md-6 mb-3">
                <Form.Label className="fw-bold small text-muted">
                  NOMBRE REAL
                </Form.Label>
                <Form.Control
                  name="nombre_pers"
                  defaultValue={superheroe.nombre_pers}
                  type="text"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-4 mb-3">
                <Form.Label className="fw-bold small text-muted">
                  AÑO
                </Form.Label>
                <Form.Control
                  name="año_aparicion"
                  defaultValue={superheroe.año_aparicion}
                  type="number"
                />
              </div>
              <div className="col-md-8 mb-3">
                <Form.Label className="fw-bold small text-muted">
                  CASA
                </Form.Label>
                <Form.Control
                  name="casa"
                  defaultValue={superheroe.casa}
                  as="select"
                  onChange={e =>
                    setSuperheroe({ ...superheroe, casa: e.target.value })
                  }>
                  <option value="Marvel">Marvel</option>
                  <option value="DC">DC</option>
                </Form.Control>
              </div>
            </div>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold small text-muted">
                BIOGRAFÍA
              </Form.Label>
              <textarea
                name="biografia"
                defaultValue={superheroe.biografia}
                className="form-control"
                rows="3"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="fw-bold small text-muted">
                EQUIPAMIENTO
              </Form.Label>
              <Form.Control
                name="equipamiento"
                defaultValue={superheroe.equipamiento}
                type="text"
              />
            </Form.Group>

            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <Button variant="danger" onClick={handleDelete}>
                Eliminar
              </Button>
              <Button variant="primary" type="submit" className="px-4">
                Guardar Cambios
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}
