import React, { useState } from 'react';
import { validarCorreo, validarTextoSimple } from '../utils/validations';
import { ActionButton } from '../components/Button/ActionButton';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [alert, setAlert] = useState<{ type: 'success' | 'danger'; text: string } | null>(null);
  const [touched, setTouched] = useState(false);

  const isNameValid = validarTextoSimple(formData.name, 2);
  const isEmailValid = formData.email ? validarCorreo(formData.email) : false;
  const isSubjectValid = formData.subject.trim().length >= 4;
  const isMessageValid = formData.message.trim().length >= 10;

  const isFormValid = isNameValid && isEmailValid && isSubjectValid && isMessageValid;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);

    if (!isFormValid) {
      setAlert({
        type: 'danger',
        text: 'Error: Revisa los campos destacados. Recuerda ingresar un correo válido (@duoc.cl, @profesor.duoc.cl, @gmail.com) y detallar tu mensaje.',
      });
      return;
    }

    setAlert({
      type: 'success',
      text: '¡Enviado! Tu mensaje ha sido recibido, un mecánico se contactará contigo a la brevedad.',
    });

    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
    setTouched(false);
  };

  return (
    <div className="container mb-5">
      <div className="mb-4 mt-2 text-center">
        <h1 className="custom-title">Contáctanos</h1>
        <p className="text-muted">¿Tienes dudas sobre un repuesto? Escríbenos y un mecánico te asesorará.</p>
      </div>

      <div className="row g-5">
        {/* Columna Información */}
        <div className="col-md-5">
          <div className="bg-light p-4 rounded-3 shadow-sm h-100">
            <h4 className="fw-bold mb-4">Información de la Tienda</h4>

            <div className="d-flex align-items-start mb-4">
              <i className="bi bi-geo-alt-fill text-warning fs-3 me-3"></i>
              <div>
                <h6 className="fw-bold mb-1">Dirección</h6>
                <p className="text-muted mb-0">
                  Av. Los Motores 1024, Sector Industrial<br />
                  Región Metropolitana, Chile
                </p>
              </div>
            </div>

            <div className="d-flex align-items-start mb-4">
              <i className="bi bi-telephone-fill text-warning fs-3 me-3"></i>
              <div>
                <h6 className="fw-bold mb-1">Teléfono</h6>
                <p className="text-muted mb-0">+56 9 1234 5678</p>
              </div>
            </div>

            <div className="d-flex align-items-start mb-4">
              <i className="bi bi-envelope-fill text-warning fs-3 me-3"></i>
              <div>
                <h6 className="fw-bold mb-1">Correo Electrónico</h6>
                <p className="text-muted mb-0">soporte@repuestoscuchau.cl</p>
              </div>
            </div>

            <div className="d-flex align-items-start">
              <i className="bi bi-clock-fill text-warning fs-3 me-3"></i>
              <div>
                <h6 className="fw-bold mb-1">Horario de Atención</h6>
                <p className="text-muted mb-0">
                  Lunes a Viernes: 09:00 - 18:30<br />
                  Sábados: 09:00 - 14:00
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Columna Formulario */}
        <div className="col-md-7">
          <div className="card border-0 shadow-sm p-4">
            <h4 className="fw-bold mb-4">Envíanos un Mensaje</h4>

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
                <label htmlFor="nombreContacto" className="form-label fw-bold">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  className={`form-control ${touched && !isNameValid ? 'is-invalid' : ''}`}
                  id="nombreContacto"
                  placeholder="Ej: Juan Pérez"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  maxLength={60}
                  required
                />
                <div className="invalid-feedback">Por favor, ingresa un nombre válido (al menos 2 letras).</div>
              </div>

              <div className="mb-3">
                <label htmlFor="correoContacto" className="form-label fw-bold">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  className={`form-control ${touched && !isEmailValid ? 'is-invalid' : ''}`}
                  id="correoContacto"
                  placeholder="ejemplo@duoc.cl"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  maxLength={100}
                  required
                />
                <div className="invalid-feedback">
                  Ingresa un correo válido (@duoc.cl, @profesor.duoc.cl, @gmail.com).
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="asuntoContacto" className="form-label fw-bold">
                  Asunto / Repuesto
                </label>
                <input
                  type="text"
                  className={`form-control ${touched && !isSubjectValid ? 'is-invalid' : ''}`}
                  id="asuntoContacto"
                  placeholder="Ej: Consulta por Pastillas Brembo"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  maxLength={100}
                  required
                />
                <div className="invalid-feedback">El asunto debe tener al menos 4 caracteres.</div>
              </div>

              <div className="mb-4">
                <label htmlFor="mensajeContacto" className="form-label fw-bold">
                  Mensaje
                </label>
                <textarea
                  className={`form-control ${touched && !isMessageValid ? 'is-invalid' : ''}`}
                  id="mensajeContacto"
                  rows={4}
                  placeholder="Escribe tu consulta detallada aquí..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  maxLength={1000}
                  required
                ></textarea>
                <div className="invalid-feedback">El mensaje debe tener al menos 10 caracteres.</div>
              </div>

              <ActionButton type="submit" className="w-100 fw-bold py-2">
                Enviar Mensaje
              </ActionButton>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
