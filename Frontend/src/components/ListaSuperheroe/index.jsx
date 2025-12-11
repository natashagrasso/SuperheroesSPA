import React, { useEffect, useState } from 'react'
import { getSuperheroes } from '../../services/getSuperheroes'
import { Link } from 'react-router-dom'

export function ListaSuperheroe() {
  const [superheroes, setSuperheroes] = useState([])
  const [loading, setLoading] = useState(true)
  const [busqueda, setBusqueda] = useState('') //  para el buscador

  useEffect(() => {
    getSuperheroes()
      .then(res => {
        setSuperheroes(res)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error cargando héroes:', err)
        setLoading(false)
      })
  }, [])

  //  determina el color de la etiqueta
  const getBadgeColor = casa => {
    const casaNormalizada = casa ? casa.toLowerCase() : ''
    if (casaNormalizada === 'dc') return '#0d6efd'
    if (casaNormalizada === 'marvel') return '#dc3545'
    return '#6c757d'
  }

  // --- FILTRADO ---
  const heroesFiltrados = superheroes.filter(hero =>
    hero.nombre.toLowerCase().includes(busqueda.toLowerCase()),
  )

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="container mt-4">
      {/* --- BARRA DE BÚSQUEDA --- */}
      <div className="row mb-4 justify-content-center">
        <div className="col-12 col-md-6">
          <div className="input-group shadow-sm">
            <span className="input-group-text bg-white border-end-0">🔍</span>
            <input
              type="text"
              className="form-control border-start-0"
              placeholder="Buscar superhéroe..."
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* --- TARJETAS --- */}
      <div className="row g-4">
        {heroesFiltrados.length > 0 ? (
          heroesFiltrados.map(hero => (
            <div key={hero._id} className="col-12 col-md-6 col-lg-3">
              <div className="card h-100 shadow-sm position-relative overflow-hidden hover-shadow">
                {/* Etiqueta de Casa (Marvel/DC) */}
                <span
                  className="position-absolute top-0 end-0 badge m-2"
                  style={{
                    backgroundColor: getBadgeColor(hero.casa),
                    zIndex: 10,
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                  }}>
                  {hero.casa}
                </span>

                <div
                  style={{
                    height: '300px',
                    overflow: 'hidden',
                    backgroundColor: '#f0f0f0',
                  }}>
                  <img
                    src={
                      hero.images ||
                      'https://via.placeholder.com/300x400?text=Sin+Imagen'
                    }
                    className="card-img-top w-100 h-100"
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                    alt={hero.nombre}
                    onError={e => {
                      e.target.src =
                        'https://via.placeholder.com/300x400?text=Error+Imagen'
                    }}
                  />
                </div>

                {/* Cuerpo de la tarjeta */}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold text-dark">
                    {hero.nombre}
                  </h5>
                  <h6 className="card-subtitle mb-2 text-muted fst-italic">
                    {hero.nombre_pers}
                  </h6>

                  <p className="card-text flex-grow-1 text-secondary small">
                    {hero.biografia
                      ? hero.biografia.length > 90
                        ? hero.biografia.substring(0, 90) + '...'
                        : hero.biografia
                      : 'Sin descripción disponible.'}
                  </p>

                  {/* Botón Ver Detalle */}
                  <Link to={`/${hero._id}`} className="btn btn-dark w-100 mt-3">
                    Ver Detalle
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          /* cuando la búsqueda no da resultados */
          <div className="col-12 text-center mt-5">
            <div className="alert alert-light" role="alert">
              <h4 className="text-muted mb-0">
                No se encontraron superhéroes con el nombre "{busqueda}". 😕
              </h4>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
