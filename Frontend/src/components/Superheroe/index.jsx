import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

export function Superheroe({ superheroe }) {
  // Si no hay imagen, usamos una genérica de "Sin Imagen"
  const imagen =
    superheroe.images || 'https://via.placeholder.com/300?text=Sin+Imagen'

  return (
    <Card
      style={{
        width: '18rem',
        margin: '15px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      }}>
      <div
        style={{ height: '250px', overflow: 'hidden', background: '#f0f0f0' }}>
        <Card.Img
          variant="top"
          src={imagen}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          alt={superheroe.nombre}
        />
      </div>
      <Card.Body>
        <Card.Title>{superheroe.nombre}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {superheroe.nombre_pers}
        </Card.Subtitle>
        <Card.Text>
          {/* Cortamos la biografía si es muy larga para que no rompa la tarjeta */}
          {superheroe.biografia
            ? superheroe.biografia.substring(0, 80) + '...'
            : 'Sin biografía disponible.'}
        </Card.Text>

        {/* Botón que lleva al detalle usando el ID del héroe */}
        <Button variant="dark" href={`/${superheroe.id}`} className="w-100">
          Ver Detalle
        </Button>
      </Card.Body>
    </Card>
  )
}
