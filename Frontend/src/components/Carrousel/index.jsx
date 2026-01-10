import React from 'react'
import Carousel from 'react-bootstrap/Carousel'

export function Carousels({ imagen }) {
  // Lógica de protección: Si 'imagen' es null o undefined, usamos texto vacío
  const imagenTexto = imagen ? imagen.toString() : ''

  // Separamos por comas y limpiamos espacios
  // Esto permite cargar "url1, url2, url3" en el mismo campo
  const imagenesProcesadas = imagenTexto
    .split(',')
    .map(url => url.trim())
    .filter(url => url.length > 0)

  // Si no quedó ninguna imagen válida, ponemos una por defecto para que no se vea vacío
  const slides =
    imagenesProcesadas.length > 0
      ? imagenesProcesadas
      : ['https://via.placeholder.com/400x500?text=Sin+Imagen']

  return (
    <Carousel
      fade
      // Solo mostramos flechas y puntos si hay más de 1 foto
      controls={slides.length > 1}
      indicators={slides.length > 1}
      interval={null} // Evita que pase automático muy rápido
    >
      {slides.map((url, index) => (
        <Carousel.Item key={index}>
          <div
            style={{
              width: '100%',
              height: '500px', // Altura fija para que no salte el diseño
              backgroundColor: '#e9ecef',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <img
              className="d-block"
              src={url}
              alt={`Imagen ${index + 1}`}
              style={{
                maxHeight: '100%',
                maxWidth: '100%',
                objectFit: 'contain', // Muestra la foto entera sin recortar
              }}
              onError={e => {
                e.target.src =
                  'https://via.placeholder.com/400x500?text=Error+Carga'
              }}
            />
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}
