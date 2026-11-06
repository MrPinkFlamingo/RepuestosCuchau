import { useState, type FormEvent } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Alerta from "../componentes/Alerta";
import { iniciarSesion } from "../datos/db";

function Login() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const aviso = location.state?.mensaje;
  const redirigirA = location.state?.redirigirA;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!correo.trim() || !contrasena) {
      setError("Por favor, ingresa tu correo y contraseña.");
      return;
    }

    const res = iniciarSesion(correo, contrasena);

    if (!res.ok || !res.usuario) {
      setError(res.mensaje || "Credenciales incorrectas.");
      return;
    }

    // Redirección inteligente según el rol del usuario
    if (redirigirA) {
      navigate(redirigirA);
    } else if (res.usuario.rol === "admin") {
      navigate("/admin");
    } else if (res.usuario.rol === "vendedor") {
      navigate("/vendedor");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4 p-md-5">
              <div className="text-center mb-4">
                <Link to="/" className="text-decoration-none">
                  <h4 className="fw-bold text-warning mb-1">
                    <i className="bi bi-tools me-2"></i> Repuestos Cuchau
                  </h4>
                </Link>
                <h3 className="custom-title mt-2">Iniciar Sesión</h3>
              </div>

              {aviso && !error && (
                <Alerta tipo="info" mensaje={aviso} />
              )}
              {error && (
                <Alerta tipo="danger" mensaje={error} onCerrar={() => setError(null)} />
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-bold">Correo Electrónico:</label>
                  <input
                    type="email"
                    className="form-control"
                    id="correoLogin"
                    placeholder="ejemplo@duoc.cl"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    required
                  />
                  <div className="form-text">
                    Solo correos @duoc.cl, @profesor.duoc.cl o @gmail.com
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Contraseña:</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Tu contraseña"
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                    required
                  />
                </div>

                <button className="btn btn-warning w-100 mt-4 py-2 fw-bold" type="submit">
                  <i className="bi bi-box-arrow-in-right me-1"></i> Entrar
                </button>
              </form>

              <div className="text-center mt-4 pt-3 border-top">
                <p className="text-muted small mb-2">¿Aún no tienes cuenta?</p>
                <Link to="/registro" className="btn btn-outline-dark btn-sm w-100">
                  Crear Cuenta Nueva
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

export default Login;
