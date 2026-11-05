import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Tienda Pública
import Inicio from "./paginas/Inicio";
import Productos from "./paginas/Productos";
import Categorias from "./paginas/Categorias";
import Ofertas from "./paginas/Ofertas";
import DetalleProducto from "./paginas/DetalleProducto";
import Nosotros from "./paginas/Nosotros";
import Blog from "./paginas/Blog";
import Contactos from "./paginas/Contactos";

// Flujo de Compra
import Carrito from "./paginas/Carrito";
import Pago from "./paginas/Pago";
import CompraExitosa from "./paginas/CompraExitosa";
import CompraError from "./paginas/CompraError";

// Acceso y Registro
import Login from "./paginas/Login";
import Registro from "./paginas/Registro";

// Paneles de Gestión
import PanelAdmin from "./paginas/PanelAdmin";
import GestionProductos from "./paginas/GestionProductos";
import GestionOrdenes from "./paginas/GestionOrdenes";
import GestionUsuarios from "./paginas/GestionUsuarios";
import Vendedor from "./paginas/Vendedor";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Portada */}
        <Route path="/" element={<Inicio />} />
        <Route path="/index.html" element={<Inicio />} />

        {/* Tienda */}
        <Route path="/productos" element={<Productos />} />
        <Route path="/productos.html" element={<Productos />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/ofertas" element={<Ofertas />} />

        {/* Detalle Dinámico de Producto */}
        <Route path="/producto/:id" element={<DetalleProducto />} />
        {/* Compatibilidad con enlaces antiguos de master */}
        <Route path="/DetalleFiltro.html" element={<Navigate to="/producto/1" replace />} />
        <Route path="/DetallePastillas.html" element={<Navigate to="/producto/2" replace />} />
        <Route path="/DetalleBateria.html" element={<Navigate to="/producto/3" replace />} />
        <Route path="/DetalleAceite.html" element={<Navigate to="/producto/4" replace />} />

        {/* Flujo de Compra y Carrito */}
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/pago" element={<Pago />} />
        <Route path="/checkout" element={<Navigate to="/pago" replace />} />
        <Route path="/compra-exitosa" element={<CompraExitosa />} />
        <Route path="/compra-error" element={<CompraError />} />

        {/* Páginas Informativas */}
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/nosotros.html" element={<Nosotros />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog.html" element={<Blog />} />
        <Route path="/contactos" element={<Contactos />} />
        <Route path="/contactos.html" element={<Contactos />} />

        {/* Login y Registro */}
        <Route path="/login" element={<Login />} />
        <Route path="/login.html" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/register" element={<Registro />} />
        <Route path="/register.html" element={<Registro />} />

        {/* Administración y Vendedor */}
        <Route path="/admin" element={<PanelAdmin />} />
        <Route path="/admin.html" element={<PanelAdmin />} />
        <Route path="/admin/productos" element={<GestionProductos />} />
        <Route path="/gestion_productos.html" element={<GestionProductos />} />
        <Route path="/admin/ordenes" element={<GestionOrdenes />} />
        <Route path="/gestion_ordenes.html" element={<GestionOrdenes />} />
        <Route path="/admin/usuarios" element={<GestionUsuarios />} />
        <Route path="/gestion_usuarios.html" element={<GestionUsuarios />} />
        <Route path="/vendedor" element={<Vendedor />} />
        <Route path="/vendedor.html" element={<Vendedor />} />

        {/* Ruta comodín si no coincide */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
