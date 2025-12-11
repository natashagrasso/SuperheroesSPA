import { Route, Routes } from 'react-router-dom'
import { Marvel } from './pages/Marvel'
import { Home } from './pages/Home'
import { Dc } from './pages/Dc'
import { Header } from './components/Navbar/index'
// CORRECCIÓN: Agregamos llaves { } porque ahora es una exportación con nombre
import { Template } from './components/Template/index'

function App() {
  return (
    <>
      <Header />

      {/* Contenedor principal para dar espaciado */}
      <main style={{ padding: '20px' }}>
        <Routes>
          {/* 1. Rutas Específicas */}
          <Route path="/" element={<Home />} />
          <Route path="/marvel" element={<Marvel />} />
          <Route path="/dc" element={<Dc />} />

          {/* 2. Ruta Dinámica (Al final) */}
          <Route path="/:id" element={<Template />} />
        </Routes>
      </main>
    </>
  )
}

export default App
