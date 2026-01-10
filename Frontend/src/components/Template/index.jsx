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

// 1. IMPORTACIÓN DE LOGOS LOCALES
import marvelLogoImg from '../../assets/logos/marvel.png'
import dcLogoImg from '../../assets/logos/dc.png'

export function Template() {
  const [superheroe, setSuperheroe] = useState(null)
  const [loading, setLoading] = useState(true)
  const [modoEdicion, setModoEdicion] = useState(false)

  const { id } = useParams()
  const form = useRef()
  const navigate = useNavigate()

  useEffect(() => {
    if (!id || id === 'undefined') {
      setLoading(false)
      return
    }
    setLoading(true)
    getSuperheroe(id)
      .then(res => setSuperheroe(res || null))
      .catch(error => console.error(error))
      .finally(() => setLoading(false))
  }, [id])

  const handleSubmit = e => {
    e.preventDefault()
    const formData = new FormData(form.current)
    const data = Object.fromEntries(formData)

    putSuperheroes(id, data)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: '¡Cambios Guardados!',
          showConfirmButton: false,
          timer: 1500,
        })
        setSuperheroe({ ...superheroe, ...data })
        setModoEdicion(false)
      })
      .catch(() => Swal.fire('Error', 'No se pudo actualizar', 'error'))
  }

  const handleDelete = () => {
    Swal.fire({
      title: '¿Eliminar personaje?',
      text: 'Esta acción es definitiva.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then(result => {
      if (result.isConfirmed) {
        deleteSuperheroe(id).then(() => {
          Swal.fire('Eliminado', '', 'success')
          navigate('/')
        })
      }
    })
  }

  // 2. USO DE VARIABLES LOCALES
  const getLogo = () => {
    const casa = superheroe?.casa ? superheroe.casa.toLowerCase().trim() : ''
    if (casa === 'marvel') return marvelLogoImg
    if (casa === 'dc') return dcLogoImg
    return null
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
        <h3>Personaje no encontrado 😕</h3>
        <Button onClick={() => navigate('/')}>Volver al Inicio</Button>
      </div>
    )

  return (
    <div className="container mt-4 mb-5">
      <div
        className="row shadow bg-white rounded overflow-hidden"
        style={{ minHeight: '500px' }}>
        {/* COLUMNA IZQUIERDA: CARRUSEL */}
        <div className="col-md-5 p-0 bg-light border-end d-flex align-items-center justify-content-center">
          <Carousels imagen={superheroe.images} />
        </div>

        {/* COLUMNA DERECHA: INFO O FORMULARIO */}
        <div className="col-md-7 p-4 d-flex flex-column">
          <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2">
            <div className="d-flex align-items-center">
              <button
                className="btn btn-link text-dark p-0 me-3"
                onClick={() => navigate('/')}
                title="Volver al inicio">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  fill="currentColor"
                  viewBox="0 0 16 16">
                  <path
                    fillRule="evenodd"
                    d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                  />
                </svg>
              </button>
              <h2 className="fw-bold mb-0 text-uppercase">
                {modoEdicion ? 'Editar Perfil' : 'Descripcion del Personajes'}
              </h2>
            </div>
            {/* Logo local optimizado */}
            {getLogo() && (
              <img
                src={getLogo()}
                alt="Logo"
                style={{ height: '45px', objectFit: 'contain' }}
              />
            )}
          </div>

          {modoEdicion ? (
            /* MODO EDICIÓN */
            <Form ref={form} onSubmit={handleSubmit} className="flex-grow-1">
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold small text-muted">
                  IMÁGENES (URLs)
                </Form.Label>
                <Form.Control
                  name="images"
                  defaultValue={superheroe.images}
                  type="text"
                />
                <Form.Text
                  className="text-muted"
                  style={{ fontSize: '0.8rem' }}>
                  Separa con comas para cargar múltiples fotos.
                </Form.Text>
              </Form.Group>

              <div className="row">
                <div className="col-6 mb-3">
                  <Form.Label className="fw-bold small text-muted">
                    NOMBRE
                  </Form.Label>
                  <Form.Control
                    name="nombre"
                    defaultValue={superheroe.nombre}
                    required
                  />
                </div>
                <div className="col-6 mb-3">
                  <Form.Label className="fw-bold small text-muted">
                    NOMBRE REAL
                  </Form.Label>
                  <Form.Control
                    name="nombre_pers"
                    defaultValue={superheroe.nombre_pers}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-4 mb-3">
                  <Form.Label className="fw-bold small text-muted">
                    AÑO
                  </Form.Label>
                  <Form.Control
                    name="año_aparicion"
                    defaultValue={superheroe.año_aparicion}
                    type="number"
                  />
                </div>
                <div className="col-8 mb-3">
                  <Form.Label className="fw-bold small text-muted">
                    CASA
                  </Form.Label>
                  <Form.Select name="casa" defaultValue={superheroe.casa}>
                    <option value="Marvel">Marvel</option>
                    <option value="DC">DC</option>
                  </Form.Select>
                </div>
              </div>

              <Form.Group className="mb-3">
                <Form.Label className="fw-bold small text-muted">
                  BIOGRAFÍA
                </Form.Label>
                <Form.Control
                  as="textarea"
                  name="biografia"
                  defaultValue={superheroe.biografia}
                  rows={4}
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="fw-bold small text-muted">
                  EQUIPAMIENTO
                </Form.Label>
                <Form.Control
                  name="equipamiento"
                  defaultValue={superheroe.equipamiento}
                />
              </Form.Group>

              <div className="d-flex justify-content-end gap-2 mt-auto border-top pt-3">
                <Button
                  variant="secondary"
                  onClick={() => setModoEdicion(false)}>
                  Cancelar
                </Button>
                <Button variant="success" type="submit" className="px-4">
                  Guardar Cambios
                </Button>
              </div>
            </Form>
          ) : (
            /* MODO LECTURA - CAMBIO APLICADO AQUÍ */
            <div className="modo-lectura d-flex flex-column h-100">
              <div className="row mb-3">
                <div className="col-6 d-flex align-items-center">
                  <h6 className="fw-bold text-muted small text-uppercase mb-0 me-2">
                    Nombre:
                  </h6>
                  <p className="fs-5 fw-bold text-dark mb-0">
                    {superheroe.nombre}
                  </p>
                </div>
                <div className="col-6 d-flex align-items-center">
                  <h6 className="fw-bold text-muted small text-uppercase mb-0 me-2">
                    Nombre Real:
                  </h6>
                  <p className="fs-5 text-dark mb-0 fst-italic">
                    {superheroe.nombre_pers || '-'}
                  </p>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-4 d-flex align-items-center">
                  <h6 className="fw-bold text-muted small text-uppercase mb-0 me-2">
                    Año:
                  </h6>
                  <p className="fs-5 text-dark mb-0">
                    {superheroe.año_aparicion}
                  </p>
                </div>
                <div className="col-8 d-flex align-items-center">
                  <h6 className="fw-bold text-muted small text-uppercase mb-0 me-2">
                    Casa:
                  </h6>
                  <span
                    className={`badge ${
                      superheroe.casa === 'DC' ? 'bg-primary' : 'bg-danger'
                    } fs-6`}>
                    {superheroe.casa}
                  </span>
                </div>
              </div>

              <div className="mb-3">
                <h6 className="fw-bold text-muted small text-uppercase border-bottom pb-1">
                  Biografía
                </h6>
                <p className="text-secondary" style={{ lineHeight: '1.6' }}>
                  {superheroe.biografia || 'Sin información biográfica.'}
                </p>
              </div>

              <div className="mb-3">
                <h6 className="fw-bold text-muted small text-uppercase border-bottom pb-1">
                  Equipamiento
                </h6>
                <p className="text-dark fw-medium">
                  {superheroe.equipamiento || 'Ninguno.'}
                </p>
              </div>

              <div className="mt-auto pt-4 border-top d-flex justify-content-between align-items-center">
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={handleDelete}>
                  Eliminar
                </Button>
                <Button
                  variant="dark"
                  onClick={() => setModoEdicion(true)}
                  className="px-5 shadow">
                  Editar
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
