import { useState, type FormEvent, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alerta from "../componentes/Alerta";
import { registrarUsuario } from "../datos/db";
import { validarRUT, formatearRUT, validarCorreo, validarFechaNacimiento } from "../utilidades/validaciones";

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

  // Registro de campos interactuados por el usuario
  const [tocado, setTocado] = useState<Record<string, boolean>>({});
  const [alerta, setAlerta] = useState<{ tipo: "danger" | "success"; texto: string } | null>(null);
  const navigate = useNavigate();

  // Estados derivados de validación (principios de React puro)
  const nombreValido = nombre.trim().length >= 2;
  const apellidosValido = apellidos.trim().length >= 2;
  const rutValido = validarRUT(rut);
  const fechaValida = validarFechaNacimiento(fechaNacimiento);
  const correoValido = validarCorreo(correo);
  const confirmarCorreoValido =
    correoValido && confirmarCorreo.trim().toLowerCase() === correo.trim().toLowerCase();
  const contrasenaValida = contrasena.length >= 4;
  const confirmarContrasenaValida =
    contrasenaValida && confirmarContrasena === contrasena;
  const regionValida = region.trim() !== "";
  const ciudadValida = ciudad.trim() !== "";
  const direccionValida = direccion.trim().length >= 5;

  const marcarTocado = (campo: string) => {
    setTocado((prev) => (prev[campo] ? prev : { ...prev, [campo]: true }));
  };

  // Helper de clases estándar de Bootstrap: is-valid (verde) o is-invalid (rojo)
  const obtenerClaseValidacion = (campo: string, esValido: boolean) => {
    if (!tocado[campo]) return "";
    return esValido ? "is-valid" : "is-invalid";
  };

  // Autoguionado para la fecha de nacimiento (DD-MM-AAAA)
  const handleFechaChange = (e: ChangeEvent<HTMLInputElement>) => {
    let valor = e.target.value;
    if (/^\d{2}$|^\d{2}-\d{2}$/.test(valor)) {
      valor = valor + "-";
    }
    setFechaNacimiento(valor);
    marcarTocado("fechaNacimiento");
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setAlerta(null);

    // Marcar todos los campos como interactuados para iluminar errores si los hay
    setTocado({
      nombre: true,
      apellidos: true,
      rut: true,
      fechaNacimiento: true,
      correo: true,
      confirmarCorreo: true,
      contrasena: true,
      confirmarContrasena: true,
      region: true,
      ciudad: true,
      direccion: true,
    });

    // 1. Validar RUT
    if (!rutValido) {
      setAlerta({
        tipo: "danger",
        texto: "RUT inválido. Verifica los números y el dígito verificador (ej: 12.345.678-5 o 12345678-5).",
      });
      return;
    }

    // 2. Validar Fecha
    if (!fechaValida) {
      setAlerta({
        tipo: "danger",
        texto: "Formato de fecha de nacimiento inválido. Debe ser DD-MM-AAAA.",
      });
      return;
    }

    // 3. Validar Correo y Coincidencia
    if (!correoValido) {
      setAlerta({
        tipo: "danger",
        texto: "Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com",
      });
      return;
    }

    if (!confirmarCorreoValido) {
      setAlerta({ tipo: "danger", texto: "Los correos electrónicos ingresados no coinciden." });
      return;
    }

    // 4. Validar Contraseñas
    if (!contrasenaValida) {
      setAlerta({ tipo: "danger", texto: "La contraseña debe tener al menos 4 caracteres." });
      return;
    }

    if (!confirmarContrasenaValida) {
      setAlerta({ tipo: "danger", texto: "Las contraseñas no coinciden." });
      return;
    }

    // 5. Validar Región, Ciudad y Dirección
    if (!regionValida || !ciudadValida || !direccionValida) {
      setAlerta({ tipo: "danger", texto: "Por favor completa la dirección completa de despacho." });
      return;
    }

    // 6. Guardar en la base de datos simulada
    const res = registrarUsuario({
      rut: formatearRUT(rut),
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

              <form onSubmit={handleSubmit} noValidate>
                {/* Nombres y Apellidos */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Nombres:</label>
                    <input
                      type="text"
                      className={`form-control ${obtenerClaseValidacion("nombre", nombreValido)}`}
                      id="nombre"
                      placeholder="Ej. Juan Andrés"
                      value={nombre}
                      onChange={(e) => {
                        setNombre(e.target.value);
                        marcarTocado("nombre");
                      }}
                      onBlur={() => marcarTocado("nombre")}
                      required
                      maxLength={50}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Apellidos:</label>
                    <input
                      type="text"
                      className={`form-control ${obtenerClaseValidacion("apellidos", apellidosValido)}`}
                      id="apellidos"
                      placeholder="Ej. Pérez Silva"
                      value={apellidos}
                      onChange={(e) => {
                        setApellidos(e.target.value);
                        marcarTocado("apellidos");
                      }}
                      onBlur={() => marcarTocado("apellidos")}
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
                      className={`form-control ${obtenerClaseValidacion("rut", rutValido)}`}
                      id="rut"
                      placeholder="12.345.678-5"
                      value={rut}
                      onChange={(e) => {
                        setRut(e.target.value);
                        marcarTocado("rut");
                      }}
                      onBlur={() => {
                        marcarTocado("rut");
                        if (rut.trim().length >= 7) {
                          setRut(formatearRUT(rut));
                        }
                      }}
                      required
                      maxLength={12}
                    />
                    <div className="form-text">Con o sin puntos y guion (ej: 12.345.678-5).</div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Fecha de Nacimiento:</label>
                    <input
                      type="text"
                      className={`form-control ${obtenerClaseValidacion("fechaNacimiento", fechaValida)}`}
                      id="fechaNacimiento"
                      placeholder="DD-MM-AAAA"
                      value={fechaNacimiento}
                      onChange={handleFechaChange}
                      onBlur={() => marcarTocado("fechaNacimiento")}
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
                      className={`form-control ${obtenerClaseValidacion("correo", correoValido)}`}
                      id="correo"
                      placeholder="ejemplo@duoc.cl"
                      value={correo}
                      onChange={(e) => {
                        setCorreo(e.target.value);
                        marcarTocado("correo");
                      }}
                      onBlur={() => marcarTocado("correo")}
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
                      className={`form-control ${obtenerClaseValidacion("confirmarCorreo", confirmarCorreoValido)}`}
                      id="confirmarCorreo"
                      placeholder="Repite tu correo"
                      value={confirmarCorreo}
                      onChange={(e) => {
                        setConfirmarCorreo(e.target.value);
                        marcarTocado("confirmarCorreo");
                      }}
                      onBlur={() => marcarTocado("confirmarCorreo")}
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
                      className={`form-control ${obtenerClaseValidacion("contrasena", contrasenaValida)}`}
                      id="contrasena"
                      placeholder="Crea una contraseña"
                      value={contrasena}
                      onChange={(e) => {
                        setContrasena(e.target.value);
                        marcarTocado("contrasena");
                      }}
                      onBlur={() => marcarTocado("contrasena")}
                      required
                    />
                    <div className="form-text">Mínimo 4 caracteres.</div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Confirmar Contraseña:</label>
                    <input
                      type="password"
                      className={`form-control ${obtenerClaseValidacion("confirmarContrasena", confirmarContrasenaValida)}`}
                      id="confirmarContrasena"
                      placeholder="Vuelve a escribirla"
                      value={confirmarContrasena}
                      onChange={(e) => {
                        setConfirmarContrasena(e.target.value);
                        marcarTocado("confirmarContrasena");
                      }}
                      onBlur={() => marcarTocado("confirmarContrasena")}
                      required
                    />
                  </div>
                </div>

                {/* Región y Ciudad */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Región:</label>
                    <select
                      className={`form-select ${obtenerClaseValidacion("region", regionValida)}`}
                      value={region}
                      onChange={(e) => {
                        setRegion(e.target.value);
                        marcarTocado("region");
                      }}
                      onBlur={() => marcarTocado("region")}
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
                      className={`form-select ${obtenerClaseValidacion("ciudad", ciudadValida)}`}
                      value={ciudad}
                      onChange={(e) => {
                        setCiudad(e.target.value);
                        marcarTocado("ciudad");
                      }}
                      onBlur={() => marcarTocado("ciudad")}
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
                    className={`form-control ${obtenerClaseValidacion("direccion", direccionValida)}`}
                    id="direccion"
                    rows={2}
                    maxLength={300}
                    placeholder="Ej: Av. Los Motores 1024, Depto 302..."
                    value={direccion}
                    onChange={(e) => {
                      setDireccion(e.target.value);
                      marcarTocado("direccion");
                    }}
                    onBlur={() => marcarTocado("direccion")}
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
