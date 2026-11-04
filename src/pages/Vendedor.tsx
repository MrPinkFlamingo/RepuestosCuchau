import { Link, useNavigate } from "react-router-dom";
import { setUsuarioSesion } from "../data/db";

function Vendedor() {
  const navigate = useNavigate();

  const handleCerrarSesion = () => {
    setUsuarioSesion(null);
    navigate("/login");
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      {/* NAVBAR VENDEDOR */}
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#212529" }}>
        <div className="container">
          <Link className="navbar-brand fw-bold text-warning" to="/vendedor">
            <i className="bi bi-person-workspace me-2"></i> Panel Vendedor
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navVendedor"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navVendedor">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/gestion-productos?rol=vendedor">
                  Lista de Productos
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/gestion-ordenes?rol=vendedor">
                  Lista de Órdenes
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto align-items-center">
              <li className="nav-item">
                <Link className="nav-link text-white me-2" to="/">
                  <i className="bi bi-shop me-1"></i> Ir a la Tienda
                </Link>
              </li>
              <li className="nav-item">
                <button
                  onClick={handleCerrarSesion}
                  className="btn btn-outline-danger btn-sm"
                >
                  <i className="bi bi-box-arrow-right me-1"></i> Cerrar Sesión
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* CONTENIDO VENDEDOR */}
      <div className="container mt-5 flex-grow-1 mb-5">
        <h2 className="mb-4 custom-title text-center text-md-start">Bienvenido, Vendedor</h2>

        <div className="row g-4 text-center justify-content-center">
          {/* Opción 1: Lista de Productos */}
          <div className="col-md-5">
            <div className="card shadow-sm h-100 border-0 p-4 product-card-hover">
              <i className="bi bi-box-seam text-warning" style={{ fontSize: "3rem" }}></i>
              <h5 className="fw-bold mt-3">Lista de Productos</h5>
              <p className="text-muted small">
                Visualizar el catálogo completo de repuestos y sus detalles técnicos.
              </p>
              <Link to="/gestion-productos?rol=vendedor" className="btn btn-outline-dark mt-2 w-50 mx-auto">
                Ver Productos
              </Link>
            </div>
          </div>

          {/* Opción 2: Lista de Órdenes */}
          <div className="col-md-5">
            <div className="card shadow-sm h-100 border-0 p-4 product-card-hover">
              <i className="bi bi-receipt text-warning" style={{ fontSize: "3rem" }}></i>
              <h5 className="fw-bold mt-3">Lista de Órdenes</h5>
              <p className="text-muted small">
                Revisar el historial de ventas, órdenes generadas y su estado detallado.
              </p>
              <Link to="/gestion-ordenes?rol=vendedor" className="btn btn-outline-dark mt-2 w-50 mx-auto">
                Ver Órdenes
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-dark text-white text-center py-4 mt-auto">
        <div className="container">
          <p className="footer-text mb-0">&copy; 2026 Repuestos Cuchau. Todos los derechos reservados.</p>
          <p className="footer-text mt-1">Soporte y Garantía | Política de Privacidad</p>
        </div>
      </footer>
    </div>
  );
}

export default Vendedor;
