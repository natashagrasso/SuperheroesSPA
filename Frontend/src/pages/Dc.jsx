import React, { useEffect, useState } from 'react'
import { getDc } from '../services/getDc'
import { Superheroe } from '../components/Superheroe/index'

export function Dc() {
  const [superDc, setSuperDc] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getDc()
      .then(res => {
        setSuperDc(res)
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
        superDc.length > 0 ? (
          superDc.map(supers => (
            <Superheroe key={supers.id} superheroe={supers} />
          ))
        ) : (
          <p className="text-center mt-5">No se encuentran superhéroes de DC</p>
        )
      ) : (
        <p className="text-center mt-5">Cargando...</p>
      )}
    </section>
  )
}
