import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validarCorreo } from "../utils/validaciones";
import { getUsuarios, setUsuarioSesion } from "../data/db";

function Login() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [alerta, setAlerta] = useState<{ tipo: "danger" | "success"; mensaje: string } | null>(null);
  const [wasValidated, setWasValidated] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setWasValidated(true);

    const correoValido = validarCorreo(correo);
    const passValido = contrasena.trim() !== "";

    if (!correoValido || !passValido) {
      setAlerta({ tipo: "danger", mensaje: "Error: Revisa campos en rojo." });
      return;
    }

    // Buscar en la base de datos de usuarios
    const usuarios = getUsuarios();
    const usuarioEncontrado = usuarios.find(
      (u) => u.correo.toLowerCase() === correo.trim().toLowerCase()
    );

    if (!usuarioEncontrado) {
      setAlerta({
        tipo: "danger",
        mensaje: "Error: Usuario no registrado en la base de datos.",
      });
      return;
    }

    if (usuarioEncontrado.estado === "Inactivo") {
      setAlerta({
        tipo: "danger",
        mensaje: "Error: Cuenta inactiva. Contacta al administrador.",
      });
      return;
    }

    setUsuarioSesion(usuarioEncontrado);

    if (usuarioEncontrado.rol === "admin") {
      setAlerta({ tipo: "success", mensaje: "¡Inicio exitoso!" });
      setTimeout(() => navigate("/admin.html"), 1000);
    } else if (usuarioEncontrado.rol === "vendedor") {
      setAlerta({ tipo: "success", mensaje: "¡Inicio exitoso!" });
      setTimeout(() => navigate("/vendedor.html"), 1000);
    } else {
      setAlerta({ tipo: "success", mensaje: "¡Inicio exitoso!" });
      setTimeout(() => navigate("/"), 1000);
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4 p-md-5">
              <h3 className="custom-title text-center mb-4">Iniciar Sesión</h3>

              {alerta && (
                <div className={`alert alert-${alerta.tipo}`}>
                  {alerta.mensaje}
                </div>
              )}

              <form
                id="form-login"
                className={wasValidated ? "was-validated" : "needs-validation"}
                noValidate
                onSubmit={handleSubmit}
              >
                <div className="mb-3">
                  <label className="form-label">Correo Electrónico:</label>
                  <input
                    type="email"
                    className={`form-control ${wasValidated && !validarCorreo(correo) ? "is-invalid" : ""}`}
                    id="correoLogin"
                    placeholder="ejemplo@duoc.cl"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    required
                  />
                  <div className="invalid-feedback">Formato inválido. Solo dominios permitidos.</div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Contraseña:</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Tu contraseña"
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                    required
                  />
                  <div className="invalid-feedback">Falta la contraseña.</div>
                </div>

                <button className="btn btn-custom-action w-100 mt-4 py-2" type="submit">
                  Entrar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
