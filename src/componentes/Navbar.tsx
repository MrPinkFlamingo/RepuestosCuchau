import { Link, NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <header>
      {/* 1. Barra superior fija: Logo + Sesión + Carrito */}
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#212529' }}>
        <div className="container">
          <Link className="navbar-brand fw-bold text-warning" to="/">
            <i className="bi bi-tools me-2"></i> Repuestos Cuchau
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarPrincipal"
            aria-controls="navbarPrincipal"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarPrincipal">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
              <li className="nav-item">
                <Link className="nav-link text-white" to="/login">
                  Iniciar Sesión
                </Link>
              </li>
              <li className="nav-item ms-2">
                <Link className="btn btn-outline-light btn-sm" to="/registro">
                  Regístrate
                </Link>
              </li>
              <li className="nav-item ms-3">
                <Link className="nav-link text-warning fs-5" to="/registro" title="Carrito">
                  <i className="bi bi-cart3"></i>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* 2. Barra de categorías: cambia dinámicamente con NavLink según la página */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm mb-4">
        <div className="container">
          <ul className="navbar-nav flex-row w-100 justify-content-center flex-wrap" style={{ gap: '15px' }}>
            <li className="nav-item">
              <NavLink
                to="/"
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
  )
}

export default Navbar
