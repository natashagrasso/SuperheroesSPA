import React from 'react'
import Carousel from 'react-bootstrap/Carousel'

export function Carousels({ imagen }) {
  const imagenes = Array.isArray(imagen) ? imagen : [imagen]

  return (
    <Carousel>
      {imagenes.map((img, idx) => (
        <Carousel.Item key={idx}>
          <img
            className="d-block w-100"
            src={img || 'https://via.placeholder.com/400'}
            alt="Slide"
            style={{
              height: '400px',
              objectFit: 'contain',
              backgroundColor: '#222',
              borderRadius: '10px',
            }}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  )
}
