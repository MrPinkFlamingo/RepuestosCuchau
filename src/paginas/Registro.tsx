import { useState, type FormEvent, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alerta from "../componentes/Alerta";
import { registrarUsuario } from "../datos/db";
import { validarRUT, validarCorreo, validarFechaNacimiento } from "../utilidades/validaciones";

function Registro() {
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [rut, setRut] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [correo, setCorreo] = useState("");
  const [confirmarCorreo, setConfirmarCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [confirmarContrasena, setConfirmarContrasena] = useState("");
  const [region, setRegion] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [direccion, setDireccion] = useState("");

  const [alerta, setAlerta] = useState<{ tipo: "danger" | "success"; texto: string } | null>(null);
  const navigate = useNavigate();

  // Autoguionado para la fecha de nacimiento (DD-MM-AAAA)
  const handleFechaChange = (e: ChangeEvent<HTMLInputElement>) => {
    let valor = e.target.value;
    if (/^\d{2}$|^\d{2}-\d{2}$/.test(valor)) {
      valor = valor + "-";
    }
    setFechaNacimiento(valor);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setAlerta(null);

    // 1. Validar RUT
    if (!validarRUT(rut)) {
      setAlerta({
        tipo: "danger",
        texto: "RUT inválido. Debe ser real, sin puntos ni guion (ej: 123456785 o 12345678K).",
      });
      return;
    }

    // 2. Validar Fecha
    if (!validarFechaNacimiento(fechaNacimiento)) {
      setAlerta({
        tipo: "danger",
        texto: "Formato de fecha de nacimiento inválido. Debe ser DD-MM-AAAA.",
      });
      return;
    }

    // 3. Validar Correo y Coincidencia
    if (!validarCorreo(correo)) {
      setAlerta({
        tipo: "danger",
        texto: "Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com",
      });
      return;
    }

    if (correo.toLowerCase() !== confirmarCorreo.toLowerCase()) {
      setAlerta({ tipo: "danger", texto: "Los correos electrónicos ingresados no coinciden." });
      return;
    }

    // 4. Validar Contraseñas
    if (contrasena.length < 4) {
      setAlerta({ tipo: "danger", texto: "La contraseña debe tener al menos 4 caracteres." });
      return;
    }

    if (contrasena !== confirmarContrasena) {
      setAlerta({ tipo: "danger", texto: "Las contraseñas no coinciden." });
      return;
    }

    // 5. Guardar en la base de datos simulada
    const res = registrarUsuario({
      rut,
      nombre,
      apellidos,
      correo,
      contrasena,
      rol: "cliente",
      region,
      comuna: ciudad,
      direccion,
    });

    if (!res.ok) {
      setAlerta({ tipo: "danger", texto: res.mensaje });
      return;
    }

    setAlerta({
      tipo: "success",
      texto: "¡Registro exitoso! Redirigiendo al inicio de sesión...",
    });

    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-10 col-lg-8">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4 p-md-5">
              <div className="text-center mb-4">
                <Link to="/" className="text-decoration-none">
                  <h4 className="fw-bold text-warning mb-1">
                    <i className="bi bi-tools me-2"></i> Repuestos Cuchau
                  </h4>
                </Link>
                <h3 className="custom-title mt-2">Registro de Usuario</h3>
              </div>

              {alerta && (
                <Alerta
                  tipo={alerta.tipo}
                  mensaje={alerta.texto}
                  onCerrar={() => setAlerta(null)}
                />
              )}

              <form onSubmit={handleSubmit}>
                {/* Nombres y Apellidos */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Nombres:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="nombre"
                      placeholder="Ej. Juan Andrés"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      required
                      maxLength={50}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Apellidos:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="apellidos"
                      placeholder="Ej. Pérez Silva"
                      value={apellidos}
                      onChange={(e) => setApellidos(e.target.value)}
                      required
                      maxLength={100}
                    />
                  </div>
                </div>

                {/* RUT y Fecha de Nacimiento */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">RUT (Run):</label>
                    <input
                      type="text"
                      className="form-control"
                      id="rut"
                      placeholder="123456785"
                      value={rut}
                      onChange={(e) => setRut(e.target.value)}
                      required
                      minLength={7}
                      maxLength={9}
                    />
                    <div className="form-text">Sin puntos ni guion.</div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Fecha de Nacimiento:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="fechaNacimiento"
                      placeholder="DD-MM-AAAA"
                      value={fechaNacimiento}
                      onChange={handleFechaChange}
                      required
                      maxLength={10}
                    />
                    <div className="form-text">Formato: DD-MM-AAAA</div>
                  </div>
                </div>

                {/* Correos */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Correo Electrónico:</label>
                    <input
                      type="email"
                      className="form-control"
                      id="correo"
                      placeholder="ejemplo@duoc.cl"
                      value={correo}
                      onChange={(e) => setCorreo(e.target.value)}
                      required
                      maxLength={100}
                    />
                    <div className="form-text">
                      Solo @duoc.cl, @profesor.duoc.cl o @gmail.com
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Confirmar Correo:</label>
                    <input
                      type="email"
                      className="form-control"
                      id="confirmarCorreo"
                      placeholder="Repite tu correo"
                      value={confirmarCorreo}
                      onChange={(e) => setConfirmarCorreo(e.target.value)}
                      required
                      maxLength={100}
                    />
                  </div>
                </div>

                {/* Contraseñas */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Contraseña:</label>
                    <input
                      type="password"
                      className="form-control"
                      id="contrasena"
                      placeholder="Crea una contraseña"
                      value={contrasena}
                      onChange={(e) => setContrasena(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Confirmar Contraseña:</label>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmarContrasena"
                      placeholder="Vuelve a escribirla"
                      value={confirmarContrasena}
                      onChange={(e) => setConfirmarContrasena(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Región y Ciudad */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Región:</label>
                    <select
                      className="form-select"
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                      required
                    >
                      <option value="" disabled>Selecciona tu región...</option>
                      <option value="Región Metropolitana">Región Metropolitana</option>
                      <option value="Región del Bío Bío">Región del Bío Bío</option>
                      <option value="Región de La Araucanía">Región de La Araucanía</option>
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Ciudad / Comuna:</label>
                    <select
                      className="form-select"
                      value={ciudad}
                      onChange={(e) => setCiudad(e.target.value)}
                      required
                    >
                      <option value="" disabled>Selecciona tu ciudad...</option>
                      <optgroup label="Metropolitana">
                        <option value="Santiago">Santiago</option>
                        <option value="Puente Alto">Puente Alto</option>
                        <option value="Maipú">Maipú</option>
                      </optgroup>
                      <optgroup label="Bío Bío">
                        <option value="Concepción">Concepción</option>
                        <option value="Talcahuano">Talcahuano</option>
                        <option value="Los Ángeles">Los Ángeles</option>
                      </optgroup>
                      <optgroup label="La Araucanía">
                        <option value="Temuco">Temuco</option>
                        <option value="Villarrica">Villarrica</option>
                        <option value="Pucón">Pucón</option>
                      </optgroup>
                    </select>
                  </div>
                </div>

                {/* Dirección */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Dirección exacta:</label>
                  <textarea
                    className="form-control"
                    id="direccion"
                    rows={2}
                    maxLength={300}
                    placeholder="Ej: Av. Los Motores 1024, Depto 302..."
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                    required
                  ></textarea>
                </div>

                <button className="btn btn-warning w-100 mt-4 py-2 fw-bold" type="submit">
                  <i className="bi bi-person-check-fill me-1"></i> Registrarme
                </button>
              </form>

              <div className="text-center mt-4 pt-3 border-top">
                <p className="text-muted small mb-2">¿Ya tienes una cuenta?</p>
                <Link to="/login" className="btn btn-outline-dark btn-sm w-100">
                  Iniciar Sesión
                </Link>
                <Link to="/" className="d-block text-muted small mt-3 text-decoration-none">
                  <i className="bi bi-arrow-left"></i> Volver a la tienda
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registro;
