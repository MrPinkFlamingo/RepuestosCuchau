import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { validarCorreo } from '../utils/validations';
import { ActionButton } from '../components/Button/ActionButton';
import { useApp } from '../context/AppContext';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'danger'; text: string } | null>(null);

  const navigate = useNavigate();
  const { login } = useApp();

  const isEmailValid = email ? validarCorreo(email) : false;
  const isPasswordValid = password.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);

    if (!isEmailValid) {
      setAlert({
        type: 'danger',
        text: 'Ingresa un correo válido con dominio permitido (@duoc.cl, @profesor.duoc.cl, @gmail.com).',
      });
      return;
    }

    if (!isPasswordValid) {
      setAlert({
        type: 'danger',
        text: 'Por favor, ingresa tu contraseña.',
      });
      return;
    }

    const result = login(email, password);

    if (!result.success) {
      setAlert({
        type: 'danger',
        text: result.error || 'Credenciales inválidas.',
      });
      return;
    }

    setAlert({
      type: 'success',
      text: '¡Inicio exitoso! Bienvenido a Repuestos Cuchau.',
    });

    setTimeout(() => {
      navigate('/');
    }, 1200);
  };

  return (
    <div className="container mt-4 mb-5 flex-grow-1">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4 p-md-5">
              <h3 className="custom-title text-center mb-4">Iniciar Sesión</h3>

              {alert && (
                <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
                  {alert.text}
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setAlert(null)}
                    aria-label="Cerrar"
                  ></button>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label className="form-label fw-bold">Correo Electrónico:</label>
                  <input
                    type="email"
                    className={`form-control ${touched && !isEmailValid ? 'is-invalid' : ''}`}
                    id="correoLogin"
                    placeholder="ejemplo@duoc.cl"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <div className="invalid-feedback">
                    Formato inválido. Solo dominios permitidos (@duoc.cl, @profesor.duoc.cl, @gmail.com).
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Contraseña:</label>
                  <input
                    type="password"
                    className={`form-control ${touched && !isPasswordValid ? 'is-invalid' : ''}`}
                    placeholder="Tu contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <div className="invalid-feedback">Falta la contraseña.</div>
                </div>

                <ActionButton type="submit" className="w-100 mt-4 py-2">
                  Entrar
                </ActionButton>
              </form>

              {/* Sugerencias para pruebas rápidas */}
              <div className="card bg-light border-0 mt-4 p-3 small text-muted">
                <div className="fw-bold text-dark mb-1">
                  <i className="bi bi-info-circle me-1 text-warning"></i>Cuentas precargadas de prueba (Contraseña: <strong>1</strong>):
                </div>
                <div><strong>Admin:</strong> carlos@profesor.duoc.cl</div>
                <div><strong>Vendedor:</strong> juan.perez@duoc.cl</div>
                <div><strong>Cliente:</strong> maria.lopez@gmail.com</div>
              </div>

              <div className="text-center mt-4">
                <span className="text-muted small">¿No tienes cuenta? </span>
                <Link to="/registro" className="small fw-bold text-decoration-none">
                  Regístrate aquí
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
