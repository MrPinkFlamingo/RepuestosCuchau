import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const { currentUser, logout, cartCount, setIsCartOpen } = useApp();

  if (pathname.startsWith('/gestion-')) return null;

  return (
    <header>
      {/* NAVBAR PRINCIPAL (Buscador, Login, Carrito, Paneles) */}
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#212529' }}>
        <div className="container">
          {/* Logo */}
          <Link className="navbar-brand fw-bold text-warning" to="/">
            <i className="bi bi-tools me-2"></i>Repuestos Cuchau
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-controls="navbarPrincipal"
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarPrincipal">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
              {/* Enlace Admin visible si el usuario es Administrador */}
              {currentUser?.role === 'Administrador' && (
                <li className="nav-item me-2">
                  <Link to="/admin" className="nav-link text-warning fw-bold small">
                    <i className="bi bi-shield-lock me-1"></i>Panel Admin
                  </Link>
                </li>
              )}

              {/* Estado de sesión reactivo */}
              {currentUser ? (
                <>
                  <li className="nav-item me-2">
                    <span className="navbar-text text-light small">
                      <i className="bi bi-person-circle text-warning me-1"></i>
                      Hola, <strong>{currentUser.name.split(' ')[0]}</strong>
                      <span className="badge bg-secondary ms-2" style={{ fontSize: '0.7rem' }}>
                        {currentUser.role}
                      </span>
                    </span>
                  </li>
                  <li className="nav-item">
                    <button
                      className="btn btn-outline-danger btn-sm px-2 py-1"
                      onClick={logout}
                      title="Cerrar Sesión"
                    >
                      <i className="bi bi-box-arrow-right me-1"></i>Salir
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/login">
                      Iniciar Sesión
                    </Link>
                  </li>
                  <li className="nav-item ms-lg-2 my-2 my-lg-0">
                    <Link className="btn btn-outline-light btn-sm px-3" to="/registro">
                      Regístrate
                    </Link>
                  </li>
                </>
              )}

              {/* Botón reactivo del Carrito de Compras */}
              <li className="nav-item ms-lg-3">
                <button
                  type="button"
                  className="btn btn-link text-warning fs-5 position-relative p-1 text-decoration-none"
                  onClick={() => setIsCartOpen(true)}
                  title="Ver Carrito de Compras"
                >
                  <i className="bi bi-cart3"></i>
                  {cartCount > 0 && (
                    <span
                      className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                      style={{ fontSize: '0.65rem' }}
                    >
                      {cartCount}
                    </span>
                  )}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* NAVBAR DE CATEGORÍAS (Secundario) */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm mb-4">
        <div className="container">
          <ul className="navbar-nav flex-row w-100 justify-content-center flex-wrap" style={{ gap: '15px' }}>
            <li className="nav-item">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `nav-link fw-bold ${isActive ? 'text-primary' : 'text-dark'}`
                }
              >
                Inicio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/productos"
                className={({ isActive }) =>
                  `nav-link fw-bold ${isActive ? 'text-primary' : 'text-dark'}`
                }
              >
                Productos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/nosotros"
                className={({ isActive }) =>
                  `nav-link fw-bold ${isActive ? 'text-primary' : 'text-dark'}`
                }
              >
                Nosotros
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/blog"
                className={({ isActive }) =>
                  `nav-link fw-bold ${isActive ? 'text-primary' : 'text-dark'}`
                }
              >
                Blog
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/contactos"
                className={({ isActive }) =>
                  `nav-link fw-bold ${isActive ? 'text-primary' : 'text-dark'}`
                }
              >
                Contactos
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};
