import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartModal } from './components/Cart/CartModal';

// Páginas
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { ProductDetail } from './pages/ProductDetail';
import { About } from './pages/About';
import { Blog } from './pages/Blog';
import { Contact } from './pages/Contact';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Admin } from './pages/Admin';
import { ProductManagement } from './pages/ProductManagement';
import { OrderManagement } from './pages/OrderManagement';
import { UserManagement } from './pages/UserManagement';

// Componente para volver arriba al cambiar de ruta
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="d-flex flex-column min-vh-100">
          {/* Navbar persistente y reactivo */}
          <Navbar />

          {/* Modal reactivo del Carrito */}
          <CartModal />

          {/* Contenido principal dinámico según la ruta */}
          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/productos" element={<Products />} />
              <Route path="/producto/:id" element={<ProductDetail />} />
              <Route path="/nosotros" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contactos" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registro" element={<Register />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/gestion-productos" element={<ProductManagement />} />
              <Route path="/gestion-ordenes" element={<OrderManagement />} />
              <Route path="/gestion-usuarios" element={<UserManagement />} />
              {/* Ruta por defecto para cualquier ruta no encontrada */}
              <Route path="*" element={<Home />} />
            </Routes>
          </main>

          {/* Footer persistente */}
          <Footer />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
