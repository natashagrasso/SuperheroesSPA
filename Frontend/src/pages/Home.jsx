import React from 'react'
// Importamos el botón de agregar (export default)
import AgregarSuperheroe from '../components/AgregarSuperheroe/index'
// Importamos la lista de tarjetas (named export)
import { ListaSuperheroe } from '../components/ListaSuperheroe/index'

export function Home() {
  return (
    <>
      {/* 1. Botón para cargar nuevo personaje */}
      <AgregarSuperheroe />

      {/* 2. Grilla con todos los personajes */}
      <ListaSuperheroe />
    </>
  )
}
