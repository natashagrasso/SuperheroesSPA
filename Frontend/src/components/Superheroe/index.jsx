import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

export function Superheroe({ superheroe }) {
  // 1. Manejo robusto del ID (por si viene _id o id)
  const idHeroe = superheroe._id || superheroe.id

  // 2. Manejo de imágenes: Si hay comas, tomamos solo la primera
  const imagenUrl = superheroe.images
    ? superheroe.images.split(',')[0].trim()
    : 'https://via.placeholder.com/300x400?text=Sin+Imagen'

  return (
    <Card className="h-100 shadow-sm position-relative overflow-hidden hover-shadow">
      {/* Etiqueta de la Casa */}
      <span
        className="position-absolute top-0 end-0 badge m-2"
        style={{
          backgroundColor:
            superheroe.casa?.toLowerCase() === 'marvel' ? '#dc3545' : '#0d6efd',
          zIndex: 10,
        }}>
        {superheroe.casa}
      </span>

      <div
        style={{
          height: '300px',
          overflow: 'hidden',
          backgroundColor: '#f0f0f0',
        }}>
        <Card.Img
          variant="top"
          src={imagenUrl}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          alt={superheroe.nombre}
          onError={e => {
            e.target.src =
              'https://via.placeholder.com/300x400?text=Error+Imagen'
          }}
        />
      </div>

      <Card.Body className="d-flex flex-column">
        <Card.Title className="fw-bold">{superheroe.nombre}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted fst-italic">
          {superheroe.nombre_pers}
        </Card.Subtitle>

        <Card.Text className="flex-grow-1 text-secondary small">
          {superheroe.biografia
            ? superheroe.biografia.length > 80
              ? superheroe.biografia.substring(0, 80) + '...'
              : superheroe.biografia
            : 'Sin biografía disponible.'}
        </Card.Text>

        {/* 3. Usamos Link en lugar de href para no recargar la página */}
        <Link to={`/${idHeroe}`} className="btn btn-dark w-100 mt-auto">
          Ver Detalle
        </Link>
      </Card.Body>
    </Card>
  )
}
