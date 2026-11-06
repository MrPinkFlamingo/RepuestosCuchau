import { useState, useEffect, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import BarraNavegacion from "../componentes/BarraNavegacion";
import PiePagina from "../componentes/PiePagina";
import Alerta from "../componentes/Alerta";
import {
  obtenerUsuarios,
  registrarUsuario,
  eliminarUsuario,
  obtenerUsuarioActual,
  type Usuario,
} from "../datos/db";
import { validarCorreo } from "../utilidades/validaciones";

function GestionUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>(() => obtenerUsuarios());
  const [mostrarForm, setMostrarForm] = useState(false);

  // Formulario nuevo usuario
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [rut, setRut] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("123456");
  const [rol, setRol] = useState<Usuario["rol"]>("cliente");
  const [alerta, setAlerta] = useState<{ tipo: "success" | "danger"; texto: string } | null>(null);

  const navigate = useNavigate();

  const recargar = () => {
    setUsuarios(obtenerUsuarios());
  };

  useEffect(() => {
    const actual = obtenerUsuarioActual();
    if (!actual || actual.rol !== "admin") {
      navigate("/login");
    }
  }, [navigate]);

  const handleCrearUsuario = (e: FormEvent) => {
    e.preventDefault();
    if (!nombre.trim() || !correo.trim() || !rut.trim()) {
      setAlerta({ tipo: "danger", texto: "Completa los campos obligatorios." });
      return;
    }

    if (!validarCorreo(correo)) {
      setAlerta({
        tipo: "danger",
        texto: "Correo inválido. Solo dominios @duoc.cl, @profesor.duoc.cl o @gmail.com",
      });
      return;
    }

    const res = registrarUsuario({
      rut,
      nombre,
      apellidos,
      correo,
      contrasena,
      rol,
    });

    if (!res.ok) {
      setAlerta({ tipo: "danger", texto: res.mensaje });
      return;
    }

    recargar();
    setAlerta({ tipo: "success", texto: `Usuario "${nombre}" registrado con rol [${rol}].` });

    setNombre("");
    setApellidos("");
    setRut("");
    setCorreo("");
    setMostrarForm(false);
  };

  const handleEliminar = (id: string, nombreU: string, rolU: string) => {
    if (rolU === "admin") {
      alert("Por seguridad no puedes eliminar un usuario Administrador principal.");
      return;
    }

    if (window.confirm(`¿Seguro que deseas eliminar al usuario "${nombreU}"?`)) {
      eliminarUsuario(id);
      recargar();
      setAlerta({ tipo: "success", texto: `Usuario "${nombreU}" eliminado de la base de datos.` });
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <BarraNavegacion />

      <main className="container mb-5">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center my-4 gap-2">
          <div>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-1">
                <li className="breadcrumb-item">
                  <Link to="/admin">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">Gestión de Usuarios</li>
              </ol>
            </nav>
            <h2 className="custom-title mb-0">Base de Datos de Usuarios</h2>
          </div>

          <div className="d-flex gap-2">
            <button
              type="button"
              className="btn btn-warning fw-semibold"
              onClick={() => setMostrarForm(!mostrarForm)}
            >
              <i className="bi bi-person-plus me-1"></i>
              {mostrarForm ? "Cancelar" : "Nuevo Usuario"}
            </button>
            <Link to="/admin" className="btn btn-outline-dark">
              <i className="bi bi-arrow-left"></i> Volver
            </Link>
          </div>
        </div>

        {alerta && (
          <Alerta
            tipo={alerta.tipo}
            mensaje={alerta.texto}
            onCerrar={() => setAlerta(null)}
          />
        )}

        {/* FORMULARIO PARA REGISTRAR USUARIO DESDE ADMIN */}
        {mostrarForm && (
          <div className="card shadow-sm border-0 p-4 mb-4 bg-white">
            <h5 className="fw-bold mb-3 border-bottom pb-2">Registrar Usuario o Empleado</h5>
            <form onSubmit={handleCrearUsuario} className="row g-3">
              <div className="col-md-3">
                <label className="form-label fw-semibold small">Nombres*</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ej: Marcelo"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-3">
                <label className="form-label fw-semibold small">Apellidos</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ej: Soto"
                  value={apellidos}
                  onChange={(e) => setApellidos(e.target.value)}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label fw-semibold small">RUT*</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="123456785"
                  value={rut}
                  onChange={(e) => setRut(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-3">
                <label className="form-label fw-semibold small">Rol en el Sistema*</label>
                <select
                  className="form-select"
                  value={rol}
                  onChange={(e) => setRol(e.target.value as Usuario["rol"])}
                >
                  <option value="cliente">Cliente (Comprador)</option>
                  <option value="vendedor">Vendedor (Ventas e Inventario)</option>
                  <option value="admin">Administrador (Total)</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold small">Correo Electrónico*</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="ejemplo@duoc.cl"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold small">Contraseña Inicial*</label>
                <input
                  type="password"
                  className="form-control"
                  value={contrasena}
                  onChange={(e) => setContrasena(e.target.value)}
                  required
                />
              </div>
              <div className="col-12 text-end">
                <button type="submit" className="btn btn-warning fw-bold px-4">
                  Guardar Usuario
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TABLA DE USUARIOS */}
        <div className="card shadow-sm border-0">
          <div className="card-header bg-dark text-white fw-semibold py-3">
            Usuarios en Sistema ({usuarios.length})
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Nombre Completo</th>
                    <th>RUT</th>
                    <th>Correo</th>
                    <th>Comuna</th>
                    <th>Rol</th>
                    <th className="text-end">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map((u) => (
                    <tr key={u.id}>
                      <td>
                        <strong>{u.nombre} {u.apellidos}</strong>
                      </td>
                      <td className="text-muted small">{u.rut}</td>
                      <td>{u.correo}</td>
                      <td>{u.comuna || "No registrada"}</td>
                      <td>
                        {u.rol === "admin" && <span className="badge bg-warning text-dark">Administrador</span>}
                        {u.rol === "vendedor" && <span className="badge bg-info text-dark">Vendedor</span>}
                        {u.rol === "cliente" && <span className="badge bg-secondary">Cliente</span>}
                      </td>
                      <td className="text-end">
                        {u.rol !== "admin" ? (
                          <button
                            type="button"
                            className="btn btn-outline-dark btn-sm"
                            onClick={() => handleEliminar(u.id, u.nombre, u.rol)}
                            title="Eliminar usuario"
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        ) : (
                          <span className="badge bg-light text-muted border">Protegido</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <PiePagina />
    </div>
  );
}

export default GestionUsuarios;
