import React, { useRef } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
// Asegúrate de tener este servicio creado (si no lo tienes, avísame)
import { postSuperheroes } from '../../services/postSuperheroes'
import Swal from 'sweetalert2'

export function FormularioSuperheroes() {
  const form = useRef()

  const handleSubmit = e => {
    e.preventDefault()
    const formData = new FormData(form.current)
    const data = Object.fromEntries(formData)

    // Validación básica
    if (!data.nombre || !data.images) {
      Swal.fire(
        'Error',
        'El nombre y al menos una imagen son obligatorios',
        'warning',
      )
      return
    }

    postSuperheroes(data)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: '¡Héroe Creado!',
          text: 'Recarga la página para verlo en la lista.',
          confirmButtonColor: '#0d6efd',
        }).then(() => {
          // Opcional: Recargar la página automáticamente para ver el nuevo héroe
          window.location.reload()
        })
      })
      .catch(err => {
        console.error(err)
        Swal.fire('Error', 'Hubo un problema al guardar', 'error')
      })
  }

  return (
    <Form className="p-3" ref={form} onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-6 mb-3">
          <Form.Label className="fw-bold">Nombre del Héroe *</Form.Label>
          <Form.Control
            name="nombre"
            type="text"
            placeholder="Ej: Spider-Man"
            required
          />
        </div>
        <div className="col-md-6 mb-3">
          <Form.Label className="fw-bold">Nombre Real</Form.Label>
          <Form.Control
            name="nombre_pers"
            type="text"
            placeholder="Ej: Peter Parker"
          />
        </div>
      </div>

      <div className="row">
        <div className="col-6 mb-3">
          <Form.Label className="fw-bold">Año</Form.Label>
          <Form.Control name="año_aparicion" type="number" placeholder="1962" />
        </div>
        <div className="col-6 mb-3">
          <Form.Label className="fw-bold">Casa</Form.Label>
          <Form.Select name="casa">
            <option value="Marvel">Marvel</option>
            <option value="DC">DC</option>
          </Form.Select>
        </div>
      </div>

      <Form.Group className="mb-3">
        <Form.Label className="fw-bold">Imágenes (URLs) *</Form.Label>
        <Form.Control
          name="images"
          type="text"
          placeholder="https://foto1.jpg"
          required
        />
        {/* Ayuda visual para el usuario */}
        <Form.Text className="text-muted">
          Para cargar varias fotos (carrusel), sepáralas con una coma.
          <br />
          Ej: <code>url1.jpg, url2.jpg</code>
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="fw-bold">Biografía</Form.Label>
        <Form.Control
          as="textarea"
          name="biografia"
          rows={3}
          placeholder="Breve historia..."
        />
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label className="fw-bold">Equipamiento</Form.Label>
        <Form.Control
          name="equipamiento"
          type="text"
          placeholder="Ej: Lanzarredes"
        />
      </Form.Group>

      <div className="d-grid">
        <Button variant="primary" size="lg" type="submit">
          Crear Superhéroe
        </Button>
      </div>
    </Form>
  )
}
