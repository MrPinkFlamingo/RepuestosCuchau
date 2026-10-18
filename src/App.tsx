import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './componentes/Navbar'
import Footer from './componentes/Footer'

import Inicio from './paginas/Inicio'
import Productos from './paginas/Productos'
import Nosotros from './paginas/Nosotros'
import Blog from './paginas/Blog'
import Contactos from './paginas/Contactos'
import Login from './paginas/Login'
import Registro from './paginas/Registro'

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />

        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contactos" element={<Contactos />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App