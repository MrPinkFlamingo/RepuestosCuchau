import { Link } from "react-router-dom";

interface Props {
  paginaActiva?: "Inicio" | "Productos" | "Nosotros" | "Blog" | "Contactos";
}

function Navbar({ paginaActiva }: Props) {
  return (
    <header>
      {/* NAVBAR PRINCIPAL (Buscador, Login, Carrito) */}
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#212529" }}>
        <div className="container">
          {/* Logo */}
          <Link className="navbar-brand fw-bold text-warning" to="/">
            <i className="bi bi-tools"></i> Repuestos Cuchau
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
            {/* Enlaces y Botones */}
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
              <li className="nav-item">
                <Link className="nav-link text-white" to="/login.html">
                  Iniciar Sesión
                </Link>
              </li>
              <li className="nav-item ms-2">
                <Link className="btn btn-outline-light btn-sm" to="/register.html">
                  Regístrate
                </Link>
              </li>
              <li className="nav-item ms-3">
                <Link className="nav-link text-warning fs-5" to="/register.html">
                  <i className="bi bi-cart3"></i>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* NAVBAR DE CATEGORÍAS (Secundario) */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm mb-4">
        <div className="container">
          <ul className="navbar-nav flex-row w-100 justify-content-center flex-wrap" style={{ gap: "15px" }}>
            <li className="nav-item">
              <Link
                className={`nav-link fw-bold ${paginaActiva === "Inicio" ? "text-primary" : ""}`}
                to="/"
              >
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link fw-bold ${paginaActiva === "Productos" ? "text-primary" : ""}`}
                to="/productos.html"
              >
                Productos
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link fw-bold ${paginaActiva === "Nosotros" ? "text-primary" : ""}`}
                to="/nosotros.html"
              >
                Nosotros
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link fw-bold ${paginaActiva === "Blog" ? "text-primary" : ""}`}
                to="/blog.html"
              >
                Blog
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link fw-bold ${paginaActiva === "Contactos" ? "text-primary" : ""}`}
                to="/contactos.html"
              >
                Contactos
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
