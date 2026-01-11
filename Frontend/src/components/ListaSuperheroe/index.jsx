import React, { useEffect, useState } from 'react'
import { getSuperheroes } from '../../services/getSuperheroes'
import { Link } from 'react-router-dom'

export function ListaSuperheroe({ filtroCasa }) {
  const [superheroes, setSuperheroes] = useState([])
  const [loading, setLoading] = useState(true)
  const [busqueda, setBusqueda] = useState('')

  // Estado para la paginación (Empieza mostrando 8)
  const [visibleCount, setVisibleCount] = useState(8)

  useEffect(() => {
    getSuperheroes()
      .then(res => {
        if (Array.isArray(res)) {
          setSuperheroes(res)
        } else {
          setSuperheroes([])
        }
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  // Reiniciar paginación al cambiar filtro o búsqueda
  useEffect(() => {
    setVisibleCount(8)
  }, [filtroCasa, busqueda])

  const getBadgeColor = casa => {
    const casaNormalizada = casa ? casa.toLowerCase().trim() : ''
    if (casaNormalizada === 'dc') return '#0d6efd'
    if (casaNormalizada === 'marvel') return '#dc3545'
    return '#6c757d'
  }

  // Filtros
  const heroesFiltrados = superheroes.filter(hero => {
    const coincideNombre = hero.nombre
      ?.toLowerCase()
      .includes(busqueda.toLowerCase())
    const coincideCasa = filtroCasa
      ? hero.casa?.toLowerCase() === filtroCasa.toLowerCase()
      : true
    return coincideNombre && coincideCasa
  })

  // Corte para mostrar solo los visibles
  const heroesParaMostrar = heroesFiltrados.slice(0, visibleCount)

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    )
  }

  return (
    <div className="container mt-4 mb-5">
      {/* Buscador */}
      <div className="row mb-4 justify-content-center">
        <div className="col-12 col-md-6">
          <div className="input-group shadow-sm">
            <span className="input-group-text bg-white border-end-0">🔍</span>
            <input
              type="text"
              className="form-control border-start-0"
              placeholder={`Buscar en ${filtroCasa || 'todos'}...`}
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Grilla de Tarjetas */}
      <div className="row g-4">
        {heroesParaMostrar.length > 0 ? (
          heroesParaMostrar.map(hero => {
            const idHeroe = hero._id || hero.id
            const primeraImagen = hero.images
              ? hero.images.split(',')[0].trim()
              : 'https://via.placeholder.com/300x400?text=Sin+Imagen'

            return (
              <div key={idHeroe} className="col-12 col-md-6 col-lg-3">
                <div className="card h-100 shadow-sm position-relative overflow-hidden hover-shadow">
                  <span
                    className="position-absolute top-0 end-0 badge m-2"
                    style={{
                      backgroundColor: getBadgeColor(hero.casa),
                      zIndex: 10,
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
                      src={primeraImagen}
                      className="card-img-top w-100 h-100"
                      style={{ objectFit: 'cover', objectPosition: 'center' }}
                      alt={hero.nombre}
                      onError={e => {
                        e.target.src =
                          'https://via.placeholder.com/300x400?text=Error+Imagen'
                      }}
                    />
                  </div>
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
                        : 'Sin descripción.'}
                    </p>
                    <Link
                      to={`/${idHeroe}`}
                      className="btn btn-dark w-100 mt-3">
                      Ver Detalle
                    </Link>
                  </div>
                </div>
              </div>
            )
          })
        ) : (
          <div className="col-12 text-center mt-5">
            <div className="alert alert-light">
              <h4 className="text-muted mb-0">No se encontraron resultados.</h4>
            </div>
          </div>
        )}
      </div>

      {visibleCount < heroesFiltrados.length && (
        <div className="text-center mt-5">
          <button
            className="btn btn-outline-dark px-5 py-2 rounded-pill shadow-sm"
            onClick={() => setVisibleCount(prev => prev + 4)}>
            Ver más personajes 🡣
          </button>
        </div>
      )}
    </div>
  )
}
