import React from 'react'
// Corrección: Importamos desde la carpeta, sin especificar 'index.jsx'
import { ListaSuperheroe } from '../components/ListaSuperheroe'
import AgregarSuperheroe from '../components/AgregarSuperheroe'

export function Home() {
  return (
    <>
      <div className="container pt-4">
        <h1 className="text-center mb-4 fw-bold text-dark">
          Bienvenido a Superhéroes SPA 🚀
        </h1>

        {/* Botón para cargar nuevos héroes */}
        <div className="mb-4">
          <AgregarSuperheroe />
        </div>

        {/* La lista de héroes filtrable */}
        <ListaSuperheroe />
      </div>
    </>
  )
}
