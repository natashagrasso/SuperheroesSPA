import React, { useEffect, useState } from 'react'
import { getMarvel } from '../services/getMarvel'
// Importamos el componente de la tarjeta individual
import { Superheroe } from '../components/Superheroe/index'

export function Marvel() {
  const [superMarvel, setSuperMarvel] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Llamamos al servicio que pide solo los de Marvel
    getMarvel()
      .then(res => {
        setSuperMarvel(res)
        setLoading(true)
      })
      .catch(err => console.error(err))
  }, [])

  return (
    <section
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: '20px',
        gap: '15px',
      }}>
      {loading ? (
        superMarvel.length > 0 ? (
          superMarvel.map(supers => (
            // Dibujamos una tarjeta por cada héroe encontrado
            <Superheroe key={supers.id} superheroe={supers} />
          ))
        ) : (
          <p className="text-center mt-5">
            No se encuentran superhéroes de Marvel
          </p>
        )
      ) : (
        <p className="text-center mt-5">Cargando...</p>
      )}
    </section>
  )
}
