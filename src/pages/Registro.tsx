import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validarRUT, validarCorreo, validarFechaNacimiento } from "../utils/validaciones";
import { guardarUsuario, getUsuarios, type Usuario } from "../data/db";

function Registro() {
  const navigate = useNavigate();
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

  const [alerta, setAlerta] = useState<{ tipo: "danger" | "success"; mensaje: string } | null>(null);
  const [wasValidated, setWasValidated] = useState(false);

  // Formateo automático de fecha DD-MM-AAAA
  const handleFechaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value;
    if (/^\d{2}$|^\d{2}-\d{2}$/.test(v) && v.length > fechaNacimiento.length) {
      v = v + "-";
    }
    setFechaNacimiento(v);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setWasValidated(true);

    const rutValido = validarRUT(rut);
    const fechaValida = validarFechaNacimiento(fechaNacimiento);
    const correoValido = validarCorreo(correo);
    const correosCoinciden = correo === confirmarCorreo && confirmarCorreo !== "";
    const passValido = contrasena.trim() !== "";
    const passCoinciden = contrasena === confirmarContrasena && confirmarContrasena !== "";
    const restoValido =
      nombre.trim() !== "" &&
      apellidos.trim() !== "" &&
      region !== "" &&
      ciudad !== "" &&
      direccion.trim() !== "";

    const formValido =
      rutValido &&
      fechaValida &&
      correoValido &&
      correosCoinciden &&
      passValido &&
      passCoinciden &&
      restoValido;

    if (!formValido) {
      setAlerta({ tipo: "danger", mensaje: "Error: Revisa campos en rojo." });
    } else {
      const usuariosActuales = getUsuarios();
      const nuevoUsuario: Usuario = {
        id: `USR-00${usuariosActuales.length + 1}`,
        nombre: `${nombre.trim()} ${apellidos.trim()}`,
        rut: rut.trim(),
        correo: correo.trim().toLowerCase(),
        password: contrasena,
        rol: "cliente",
        estado: "Activo",
      };

      guardarUsuario(nuevoUsuario);

      setAlerta({ tipo: "success", mensaje: "¡Registrado!" });
      setTimeout(() => navigate("/login.html"), 1500);

      setNombre("");
      setApellidos("");
      setRut("");
      setFechaNacimiento("");
      setCorreo("");
      setConfirmarCorreo("");
      setContrasena("");
      setConfirmarContrasena("");
      setRegion("");
      setCiudad("");
      setDireccion("");
      setWasValidated(false);
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-10 col-lg-8">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4 p-md-5">
              <h3 className="custom-title text-center mb-4">Registro de Usuario</h3>

              {alerta && (
                <div className={`alert alert-${alerta.tipo}`}>
                  {alerta.mensaje}
                </div>
              )}

              <form
                id="form-registro"
                className={wasValidated ? "was-validated" : "needs-validation"}
                noValidate
                onSubmit={handleSubmit}
              >
                {/* Nombres y Apellidos */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Nombres:</label>
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
                    <div className="invalid-feedback">Por favor, ingresa tus nombres.</div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Apellidos:</label>
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
                    <div className="invalid-feedback">Por favor, ingresa tus apellidos.</div>
                  </div>
                </div>

                {/* RUT y Fecha de Nacimiento */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">RUT (Run):</label>
                    <input
                      type="text"
                      className={`form-control ${wasValidated && !validarRUT(rut) ? "is-invalid" : ""}`}
                      id="rut"
                      placeholder="123456785"
                      value={rut}
                      onChange={(e) => setRut(e.target.value)}
                      required
                      minLength={7}
                      maxLength={9}
                    />
                    <div className="invalid-feedback">RUT inválido. Debe ser real y sin puntos ni guion.</div>
                    <div className="form-text">Sin puntos ni guion.</div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Fecha de Nacimiento:</label>
                    <input
                      type="text"
                      className={`form-control ${wasValidated && !validarFechaNacimiento(fechaNacimiento) ? "is-invalid" : ""}`}
                      id="fechaNacimiento"
                      placeholder="DD-MM-AAAA"
                      value={fechaNacimiento}
                      onChange={handleFechaChange}
                      required
                      maxLength={10}
                    />
                    <div className="invalid-feedback">Formato inválido o fecha incorrecta. Usa DD-MM-AAAA.</div>
                  </div>
                </div>

                {/* Correos */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Correo Electrónico:</label>
                    <input
                      type="email"
                      className={`form-control ${wasValidated && !validarCorreo(correo) ? "is-invalid" : ""}`}
                      id="correo"
                      placeholder="ejemplo@duoc.cl"
                      value={correo}
                      onChange={(e) => setCorreo(e.target.value)}
                      required
                      maxLength={100}
                    />
                    <div className="invalid-feedback">Solo dominios @duoc.cl, @profesor.duoc.cl o @gmail.com.</div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Confirmar Correo:</label>
                    <input
                      type="email"
                      className={`form-control ${wasValidated && (correo !== confirmarCorreo || confirmarCorreo === "") ? "is-invalid" : ""}`}
                      id="confirmarCorreo"
                      placeholder="Repite tu correo"
                      value={confirmarCorreo}
                      onChange={(e) => setConfirmarCorreo(e.target.value)}
                      required
                      maxLength={100}
                    />
                    <div className="invalid-feedback">Los correos no coinciden.</div>
                  </div>
                </div>

                {/* Contraseñas */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Contraseña:</label>
                    <input
                      type="password"
                      className="form-control"
                      id="contrasena"
                      placeholder="Crea una contraseña"
                      value={contrasena}
                      onChange={(e) => setContrasena(e.target.value)}
                      required
                    />
                    <div className="invalid-feedback">Por favor, ingresa una contraseña.</div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Confirmar Contraseña:</label>
                    <input
                      type="password"
                      className={`form-control ${wasValidated && (contrasena !== confirmarContrasena || confirmarContrasena === "") ? "is-invalid" : ""}`}
                      id="confirmarContrasena"
                      placeholder="Vuelve a escribirla"
                      value={confirmarContrasena}
                      onChange={(e) => setConfirmarContrasena(e.target.value)}
                      required
                    />
                    <div className="invalid-feedback">Las contraseñas no coinciden.</div>
                  </div>
                </div>

                {/* Región y Ciudad */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Región:</label>
                    <select
                      className="form-select"
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                      required
                    >
                      <option value="" disabled>Selecciona tu región...</option>
                      <option value="metropolitana">Región Metropolitana</option>
                      <option value="biobio">Región del Bío Bío</option>
                      <option value="araucania">Región de La Araucanía</option>
                    </select>
                    <div className="invalid-feedback">Por favor, selecciona una región.</div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Ciudad:</label>
                    <select
                      className="form-select"
                      value={ciudad}
                      onChange={(e) => setCiudad(e.target.value)}
                      required
                    >
                      <option value="" disabled>Selecciona tu ciudad...</option>
                      <optgroup label="Metropolitana">
                        <option value="santiago">Santiago</option>
                        <option value="puente-alto">Puente Alto</option>
                        <option value="maipu">Maipú</option>
                      </optgroup>
                      <optgroup label="Bío Bío">
                        <option value="concepcion">Concepción</option>
                        <option value="talcahuano">Talcahuano</option>
                        <option value="los-angeles">Los Ángeles</option>
                      </optgroup>
                      <optgroup label="La Araucanía">
                        <option value="temuco">Temuco</option>
                        <option value="villarrica">Villarrica</option>
                        <option value="pucon">Pucón</option>
                      </optgroup>
                    </select>
                    <div className="invalid-feedback">Por favor, selecciona una ciudad.</div>
                  </div>
                </div>

                {/* Dirección */}
                <div className="mb-3">
                  <label className="form-label">Dirección exacta (Máx. 300 caracteres):</label>
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
                  <div className="invalid-feedback">Por favor, ingresa tu dirección.</div>
                </div>

                <button className="btn btn-custom-action w-100 mt-4 py-2" type="submit">
                  Registrarme
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registro;
