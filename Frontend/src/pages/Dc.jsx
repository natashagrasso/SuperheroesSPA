import React from 'react'
// Corrección: Agregamos '/index' al final para asegurar que encuentre el archivo
import { ListaSuperheroe } from '../components/ListaSuperheroe/index'

export function Dc() {
  return (
    <>
      <div className="container pt-4">
        <h1 className="text-center mb-4 fw-bold text-primary">
          Universo DC 🔵
        </h1>
        {/* Pasamos la prop filtroCasa para mostrar solo DC */}
        <ListaSuperheroe filtroCasa="DC" />
      </div>
    </>
  )
}
