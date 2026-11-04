import { Link, useSearchParams } from "react-router-dom";
import { getProductosGestion } from "../data/db";

function GestionProductos() {
  const [searchParams] = useSearchParams();
  const rol = searchParams.get("rol") || "admin";
  const productos = getProductosGestion();

  const dashboardUrl = rol === "vendedor" ? "/vendedor" : "/admin";

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      {/* NAVBAR GESTIÓN */}
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#212529" }}>
        <div className="container">
          <Link className="navbar-brand fw-bold text-warning" to={dashboardUrl}>
            <i className="bi bi-gear-fill me-2"></i> Panel de Gestión
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navGestion"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navGestion">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" to={`/gestion-productos?rol=${rol}`}>
                  Lista de Productos
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={`/gestion-ordenes?rol=${rol}`}>
                  Lista de Órdenes
                </Link>
              </li>
              {rol !== "vendedor" && (
                <li className="nav-item">
                  <Link className="nav-link" to={`/gestion-usuarios?rol=${rol}`}>
                    Gestión de Usuarios
                  </Link>
                </li>
              )}
            </ul>
            <ul className="navbar-nav ms-auto align-items-center">
              <li className="nav-item">
                <Link className="nav-link text-white" to={dashboardUrl}>
                  <i className="bi bi-arrow-left-circle me-1"></i> Volver al Dashboard
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* CONTENIDO LISTA DE PRODUCTOS */}
      <div className="container mt-4 flex-grow-1 mb-5">
        <h2 className="mb-4 custom-title" id="titulo-productos">
          Catálogo de Repuestos
        </h2>

        <div className="card shadow-sm border-0">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover table-striped mb-0 text-center align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>Cod.</th>
                    <th>Imagen</th>
                    <th>Nombre y Descripción</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map((prod) => (
                    <tr key={prod.id}>
                      <td className="fw-bold">{prod.codigo}</td>
                      <td style={{ width: "80px" }}>
                        <img
                          src={prod.urlImagen}
                          className="img-fluid rounded bg-white p-1"
                          alt={prod.nombre}
                          style={{ maxHeight: "50px" }}
                        />
                      </td>
                      <td className="text-start">
                        <strong>{prod.nombre}</strong>
                        <br />
                        <span className="text-muted small">{prod.descripcion}</span>
                      </td>
                      <td>
                        <span className="badge rounded-pill bg-secondary">{prod.categoria}</span>
                      </td>
                      <td className="fw-bold text-dark">{prod.precio}</td>
                      <td>
                        <span
                          className={`badge rounded-pill ${
                            prod.stock < 10
                              ? "bg-dark"
                              : prod.stock < 25
                              ? "bg-warning text-dark"
                              : "bg-secondary"
                          }`}
                        >
                          {prod.stock}
                        </span>
                      </td>
                      <td>
                        <Link
                          to={`/producto/${prod.id}`}
                          className="btn btn-sm btn-outline-dark"
                        >
                          <i className="bi bi-eye me-1"></i> Detalle
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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

export default GestionProductos;
