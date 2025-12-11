import { useRef } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
// Importamos el servicio que envía los datos al backend
import { postSuperheroes } from '../../services/postSuperheroes'
// Importamos la librería de alertas bonitas
import Swal from 'sweetalert2'

export function FormularioSuperheroes() {
  // Usamos useRef para capturar los datos del formulario sin usar useState por cada campo
  const form = useRef()

  const handleSubmit = e => {
    e.preventDefault()

    // Capturamos todos los datos del formulario de una sola vez
    const formData = new FormData(form.current)
    const data = Object.fromEntries(formData.entries())

    // Enviamos los datos al Backend
    postSuperheroes(data)
      .then(() => {
        // Si todo sale bien, mostramos alerta de éxito
        Swal.fire({
          icon: 'success',
          title: '¡Héroe Agregado!',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          // Recargamos la página para que aparezca el nuevo héroe en la lista
          window.location.reload()
        })
      })
      .catch(err => {
        console.error(err)
        Swal.fire('Error', 'No se pudo guardar el personaje', 'error')
      })
  }

  return (
    <Form ref={form} onSubmit={handleSubmit} className="p-2">
      <Form.Group className="mb-3">
        <Form.Label>Nombre de Superhéroe</Form.Label>
        <Form.Control
          name="nombre"
          type="text"
          placeholder="Ej: Spider-Man"
          required
        />

        <Form.Label className="mt-2">Nombre Real</Form.Label>
        <Form.Control
          name="nombre_pers"
          type="text"
          placeholder="Ej: Peter Parker"
        />

        <Form.Label className="mt-2">URL de Imagen</Form.Label>
        <Form.Control
          name="images"
          type="text"
          placeholder="https://..."
          required
        />

        <Form.Label className="mt-2">Año de Aparición</Form.Label>
        <Form.Control name="año_aparicion" type="text" placeholder="Ej: 1962" />

        <Form.Label className="mt-2">Casa</Form.Label>
        <Form.Select name="casa">
          <option value="Marvel">Marvel</option>
          <option value="DC">DC</option>
        </Form.Select>

        <Form.Label className="mt-2">Biografía</Form.Label>
        <Form.Control
          name="biografia"
          as="textarea"
          rows={3}
          placeholder="Breve historia del personaje..."
        />

        <Form.Label className="mt-2">Equipamiento</Form.Label>
        <Form.Control
          name="equipamiento"
          type="text"
          placeholder="Ej: Escudo, Lazo, Armadura..."
        />
      </Form.Group>

      <div className="d-grid gap-2">
        <Button type="submit" variant="primary" size="lg">
          Guardar Personaje
        </Button>
      </div>
    </Form>
  )
}
