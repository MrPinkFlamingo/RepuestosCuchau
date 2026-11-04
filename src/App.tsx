import { Routes, Route } from "react-router-dom";

// Tienda pública
import Inicio from "./pages/Inicio";
import Productos from "./pages/Productos";
import Nosotros from "./pages/Nosotros";
import Blog from "./pages/Blog";
import Contactos from "./pages/Contactos";
import Login from "./pages/Login";
import Registro from "./pages/Registro";

// Páginas de detalle de repuestos
import DetalleFiltro from "./pages/DetalleFiltro";
import DetallePastillas from "./pages/DetallePastillas";
import DetalleBateria from "./pages/DetalleBateria";
import DetalleAceite from "./pages/DetalleAceite";
import Producto2 from "./pages/Producto2";

// Paneles de gestión
import Admin from "./pages/Admin";
import Vendedor from "./pages/Vendedor";
import GestionProductos from "./pages/GestionProductos";
import GestionOrdenes from "./pages/GestionOrdenes";
import GestionUsuarios from "./pages/GestionUsuarios";

function App() {
  return (
    <Routes>
      {/* Portada */}
      <Route path="/" element={<Inicio />} />
      <Route path="/index.html" element={<Inicio />} />

      {/* Páginas informativas y catálogo */}
      <Route path="/productos" element={<Productos />} />
      <Route path="/productos.html" element={<Productos />} />
      <Route path="/nosotros" element={<Nosotros />} />
      <Route path="/nosotros.html" element={<Nosotros />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog.html" element={<Blog />} />
      <Route path="/contactos" element={<Contactos />} />
      <Route path="/contactos.html" element={<Contactos />} />

      {/* Login y Registro */}
      <Route path="/login" element={<Login />} />
      <Route path="/login.html" element={<Login />} />
      <Route path="/register" element={<Registro />} />
      <Route path="/register.html" element={<Registro />} />

      {/* Detalles individuales exactos de master */}
      <Route path="/DetalleFiltro.html" element={<DetalleFiltro />} />
      <Route path="/DetallePastillas.html" element={<DetallePastillas />} />
      <Route path="/DetalleBateria.html" element={<DetalleBateria />} />
      <Route path="/DetalleAceite.html" element={<DetalleAceite />} />
      <Route path="/PlantillaDetalle.html" element={<Producto2 />} />
      <Route path="/producto/:id" element={<Producto2 />} />

      {/* Paneles de rol */}
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin.html" element={<Admin />} />
      <Route path="/vendedor" element={<Vendedor />} />
      <Route path="/vendedor.html" element={<Vendedor />} />

      {/* Tablas de gestión */}
      <Route path="/gestion-productos" element={<GestionProductos />} />
      <Route path="/gestion_productos.html" element={<GestionProductos />} />
      <Route path="/gestion-ordenes" element={<GestionOrdenes />} />
      <Route path="/gestion_ordenes.html" element={<GestionOrdenes />} />
      <Route path="/gestion-usuarios" element={<GestionUsuarios />} />
      <Route path="/gestion_usuarios.html" element={<GestionUsuarios />} />
    </Routes>
  );
}

export default App;
