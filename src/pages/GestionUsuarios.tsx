import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { getUsuarios, guardarUsuario, eliminarUsuario, type Usuario } from "../data/db";
import { validarRUT, validarCorreo } from "../utils/validaciones";

function GestionUsuarios() {
  const [searchParams] = useSearchParams();
  const rol = searchParams.get("rol") || "admin";
  const navigate = useNavigate();

  // Si un vendedor intenta entrar, redirigir
  useEffect(() => {
    if (rol === "vendedor") {
      navigate("/vendedor");
    }
  }, [rol, navigate]);

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [mostrarModal, setMostrarModal] = useState(false);

  // Campos para nuevo usuario
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevoRut, setNuevoRut] = useState("");
  const [nuevoCorreo, setNuevoCorreo] = useState("");
  const [nuevoRol, setNuevoRol] = useState<"admin" | "vendedor" | "cliente">("cliente");
  const [errorModal, setErrorModal] = useState("");

  useEffect(() => {
    setUsuarios(getUsuarios());
  }, []);

  const handleCrearUsuario = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validarRUT(nuevoRut)) {
      setErrorModal("RUT inválido. Debe ser real y sin puntos ni guion.");
      return;
    }
    if (!validarCorreo(nuevoCorreo)) {
      setErrorModal("Correo inválido. Solo dominios @duoc.cl, @profesor.duoc.cl o @gmail.com.");
      return;
    }

    const nuevo: Usuario = {
      id: `USR-00${usuarios.length + 1}`,
      nombre: nuevoNombre,
      rut: nuevoRut,
      correo: nuevoCorreo,
      password: "123",
      rol: nuevoRol,
      estado: "Activo",
    };

    guardarUsuario(nuevo);
    setUsuarios(getUsuarios());
    setMostrarModal(false);
    setNuevoNombre("");
    setNuevoRut("");
    setNuevoCorreo("");
    setErrorModal("");
  };

  const handleEliminar = (id: string) => {
    if (window.confirm("¿Estás seguro de eliminar este usuario?")) {
      eliminarUsuario(id);
      setUsuarios(getUsuarios());
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      {/* NAVBAR GESTIÓN */}
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#212529" }}>
        <div className="container">
          <Link className="navbar-brand fw-bold text-warning" to="/admin">
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
                <Link className="nav-link" to="/gestion-productos?rol=admin">
                  Lista de Productos
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/gestion-ordenes?rol=admin">
                  Lista de Órdenes
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/gestion-usuarios?rol=admin">
                  Gestión de Usuarios
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto align-items-center">
              <li className="nav-item">
                <Link className="nav-link text-white" to="/admin">
                  <i className="bi bi-arrow-left-circle me-1"></i> Volver al Dashboard
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* CONTENIDO GESTIÓN USUARIOS */}
      <div className="container mt-4 flex-grow-1 mb-5">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
          <h2 className="custom-title mb-0">Gestión de Usuarios Registrados</h2>
          <button
            className="btn btn-warning fw-bold"
            onClick={() => setMostrarModal(true)}
          >
            <i className="bi bi-person-plus-fill me-1"></i> Nuevo Usuario
          </button>
        </div>

        {/* Modal simple para crear usuario */}
        {mostrarModal && (
          <div className="card shadow-sm p-4 mb-4 border-warning">
            <h5 className="fw-bold mb-3">Registrar Nuevo Usuario en la Base de Datos</h5>
            {errorModal && <div className="alert alert-danger py-2">{errorModal}</div>}
            <form onSubmit={handleCrearUsuario}>
              <div className="row g-3">
                <div className="col-md-4">
                  <label className="form-label small fw-bold">Nombre Completo</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={nuevoNombre}
                    onChange={(e) => setNuevoNombre(e.target.value)}
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label small fw-bold">RUT (sin puntos)</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={nuevoRut}
                    onChange={(e) => setNuevoRut(e.target.value)}
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label small fw-bold">Correo Electrónico</label>
                  <input
                    type="email"
                    className="form-control"
                    required
                    value={nuevoCorreo}
                    onChange={(e) => setNuevoCorreo(e.target.value)}
                  />
                </div>
                <div className="col-md-2">
                  <label className="form-label small fw-bold">Rol</label>
                  <select
                    className="form-select"
                    value={nuevoRol}
                    onChange={(e) => setNuevoRol(e.target.value as "admin" | "vendedor" | "cliente")}
                  >
                    <option value="cliente">Cliente</option>
                    <option value="vendedor">Vendedor</option>
                    <option value="admin">Administrador</option>
                  </select>
                </div>
              </div>
              <div className="mt-3 d-flex gap-2 justify-content-end">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => setMostrarModal(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn btn-warning btn-sm fw-bold">
                  Guardar Usuario
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="card shadow-sm border-0">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover table-striped mb-0 text-center align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Nombre Completo</th>
                    <th>RUT</th>
                    <th>Correo Electrónico</th>
                    <th>Rol</th>
                    <th>Estado</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map((usr) => (
                    <tr key={usr.id}>
                      <td className="fw-bold">{usr.id}</td>
                      <td>{usr.nombre}</td>
                      <td>{usr.rut}</td>
                      <td>{usr.correo}</td>
                      <td>
                        <span
                          className={`badge rounded-pill ${
                            usr.rol === "admin"
                              ? "bg-dark"
                              : usr.rol === "vendedor"
                              ? "bg-warning text-dark"
                              : "bg-secondary"
                          }`}
                        >
                          {usr.rol === "admin"
                            ? "Administrador"
                            : usr.rol === "vendedor"
                            ? "Vendedor"
                            : "Cliente"}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`badge rounded-pill ${
                            usr.estado === "Activo" ? "bg-warning text-dark" : "bg-secondary"
                          }`}
                        >
                          {usr.estado}
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleEliminar(usr.id)}
                          title="Eliminar usuario"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
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

export default GestionUsuarios;
