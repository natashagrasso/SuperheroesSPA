import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import { Modals } from '../Modal'
import { FormularioSuperheroes } from '../FormularioSuperheroes/index'

export default function AgregarSuperheroe() {
  const [show, setShow] = useState(false)

  return (
    <div className="text-center mt-4 mb-2">
      <Button variant="primary" size="lg" onClick={() => setShow(true)}>
        + Cargar Nuevo Superhéroe
      </Button>

      <Modals
        show={show}
        handleClose={() => setShow(false)}
        title="Nuevo Personaje">
        <FormularioSuperheroes />
      </Modals>
    </div>
  )
}
