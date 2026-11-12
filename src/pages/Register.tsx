import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  validarRUT,
  validarCorreo,
  validarContrasena,
  validarFechaNacimiento,
  validarTextoSimple,
} from '../utils/validations';
import { ActionButton } from '../components/Button/ActionButton';
import { useApp } from '../context/AppContext';
import { UserItem } from '../data/users';

export const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    rut: '',
    birthDate: '',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
    region: '',
    city: '',
    address: '',
  });

  const [touched, setTouched] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'danger'; text: string } | null>(null);

  const navigate = useNavigate();
  const { users, registerUser } = useApp();

  // Ciudades por región
  const citiesByRegion: Record<string, string[]> = {
    metropolitana: ['Santiago', 'Puente Alto', 'Maipú'],
    biobio: ['Concepción', 'Talcahuano', 'Los Ángeles'],
    araucania: ['Temuco', 'Villarrica', 'Pucón'],
  };

  const isNameValid = validarTextoSimple(formData.firstName, 2);
  const isLastNameValid = validarTextoSimple(formData.lastName, 2);
  const isRutValid = validarRUT(formData.rut);
  const isBirthDateValid = validarFechaNacimiento(formData.birthDate);
  const isEmailValid = validarCorreo(formData.email);
  const isEmailMatch =
    Boolean(formData.email && formData.confirmEmail) &&
    formData.email.trim().toLowerCase() === formData.confirmEmail.trim().toLowerCase();

  const passwordCheck = validarContrasena(formData.password);
  const isPasswordValid = passwordCheck.isValid;
  const isPasswordMatch =
    Boolean(formData.password && formData.confirmPassword) &&
    formData.password === formData.confirmPassword;

  const isRegionValid = Boolean(formData.region);
  const isCityValid = Boolean(formData.city);
  const isAddressValid = formData.address.trim().length >= 5;

  const isFormValid =
    isNameValid &&
    isLastNameValid &&
    isRutValid &&
    isBirthDateValid &&
    isEmailValid &&
    isEmailMatch &&
    isPasswordValid &&
    isPasswordMatch &&
    isRegionValid &&
    isCityValid &&
    isAddressValid;

  // Formato inteligente de fecha que no traba la tecla Backspace
  const handleBirthDateChange = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 8);
    let formatted = digits;
    if (digits.length >= 5) {
      formatted = `${digits.slice(0, 2)}-${digits.slice(2, 4)}-${digits.slice(4)}`;
    } else if (digits.length >= 3) {
      formatted = `${digits.slice(0, 2)}-${digits.slice(2)}`;
    }
    setFormData({ ...formData, birthDate: formatted });
  };

  const handleRegionChange = (region: string) => {
    setFormData({
      ...formData,
      region,
      city: '', // reset ciudad al cambiar de región
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);

    if (!isFormValid) {
      setAlert({
        type: 'danger',
        text: 'Error: Revisa los campos destacados. Todos los datos deben cumplir con el formato requerido.',
      });
      return;
    }

    // Verificar si el correo ya existe
    const cleanEmail = formData.email.trim().toLowerCase();
    if (users.some((u) => u.email.trim().toLowerCase() === cleanEmail)) {
      setAlert({
        type: 'danger',
        text: 'Este correo electrónico ya se encuentra registrado. Intenta iniciar sesión.',
      });
      return;
    }

    // Crear el nuevo usuario en el estado reactivo en memoria
    const newId = `USR-00${users.length + 1}`;
    const newUser: UserItem = {
      id: newId,
      name: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
      rut: formData.rut.trim(),
      email: cleanEmail,
      password: formData.password,
      role: 'Cliente',
      status: 'Activo',
    };

    registerUser(newUser);

    setAlert({
      type: 'success',
      text: '¡Cuenta creada con éxito! Ahora puedes iniciar sesión con tu correo y contraseña.',
    });

    setTimeout(() => {
      navigate('/login');
    }, 1800);
  };

  return (
    <div className="container mt-4 mb-5 flex-grow-1">
      <div className="row justify-content-center">
        <div className="col-md-10 col-lg-8">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4 p-md-5">
              <h3 className="custom-title text-center mb-4">Registro de Usuario</h3>

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
                {/* Nombres y Apellidos */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Nombres:</label>
                    <input
                      type="text"
                      className={`form-control ${touched && !isNameValid ? 'is-invalid' : ''}`}
                      id="nombre"
                      placeholder="Ej. Juan Andrés"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      required
                      maxLength={50}
                    />
                    <div className="invalid-feedback">Ingresa al menos 2 letras (sin números ni símbolos).</div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Apellidos:</label>
                    <input
                      type="text"
                      className={`form-control ${touched && !isLastNameValid ? 'is-invalid' : ''}`}
                      id="apellidos"
                      placeholder="Ej. Pérez Silva"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      required
                      maxLength={100}
                    />
                    <div className="invalid-feedback">Ingresa tus apellidos válidos (sin números).</div>
                  </div>
                </div>

                {/* RUT y Fecha de Nacimiento */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">RUT (Run):</label>
                    <input
                      type="text"
                      className={`form-control ${touched && !isRutValid ? 'is-invalid' : ''}`}
                      id="rut"
                      placeholder="Ej. 12.345.678-5 o 123456785"
                      value={formData.rut}
                      onChange={(e) => setFormData({ ...formData, rut: e.target.value })}
                      required
                    />
                    <div className="invalid-feedback">RUT chileno inválido (Módulo 11 incorrecto o formato no válido).</div>
                    <div className="form-text">Puedes ingresarlo con o sin puntos y guion.</div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Fecha de Nacimiento:</label>
                    <input
                      type="text"
                      className={`form-control ${touched && !isBirthDateValid ? 'is-invalid' : ''}`}
                      id="fechaNacimiento"
                      placeholder="DD-MM-AAAA"
                      value={formData.birthDate}
                      onChange={(e) => handleBirthDateChange(e.target.value)}
                      required
                      maxLength={10}
                    />
                    <div className="invalid-feedback">
                      Fecha inválida (debe ser fecha real en el calendario y mayor de 16 años).
                    </div>
                  </div>
                </div>

                {/* Correos */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Correo Electrónico:</label>
                    <input
                      type="email"
                      className={`form-control ${touched && !isEmailValid ? 'is-invalid' : ''}`}
                      id="correo"
                      placeholder="ejemplo@duoc.cl"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      maxLength={100}
                    />
                    <div className="invalid-feedback">
                      Solo dominios @duoc.cl, @profesor.duoc.cl o @gmail.com con nombre de usuario.
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Confirmar Correo:</label>
                    <input
                      type="email"
                      className={`form-control ${touched && !isEmailMatch ? 'is-invalid' : ''}`}
                      id="confirmarCorreo"
                      placeholder="Repite tu correo"
                      value={formData.confirmEmail}
                      onChange={(e) => setFormData({ ...formData, confirmEmail: e.target.value })}
                      required
                      maxLength={100}
                    />
                    <div className="invalid-feedback">Los correos no coinciden.</div>
                  </div>
                </div>

                {/* Contraseñas */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Contraseña:</label>
                    <input
                      type="password"
                      className={`form-control ${touched && !isPasswordValid ? 'is-invalid' : ''}`}
                      id="contrasena"
                      placeholder="Crea una contraseña"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                    />
                    <div className="invalid-feedback">{passwordCheck.message}</div>
                    <div className="form-text">Mínimo 6 caracteres, al menos una letra y un número.</div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Confirmar Contraseña:</label>
                    <input
                      type="password"
                      className={`form-control ${touched && !isPasswordMatch ? 'is-invalid' : ''}`}
                      id="confirmarContrasena"
                      placeholder="Vuelve a escribirla"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      required
                    />
                    <div className="invalid-feedback">Las contraseñas no coinciden.</div>
                  </div>
                </div>

                {/* Región y Ciudad */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Región:</label>
                    <select
                      className={`form-select ${touched && !isRegionValid ? 'is-invalid' : ''}`}
                      value={formData.region}
                      onChange={(e) => handleRegionChange(e.target.value)}
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
                    <label className="form-label fw-bold">Ciudad:</label>
                    <select
                      className={`form-select ${touched && !isCityValid ? 'is-invalid' : ''}`}
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      required
                      disabled={!formData.region}
                    >
                      <option value="" disabled>Selecciona tu ciudad...</option>
                      {formData.region &&
                        citiesByRegion[formData.region]?.map((c) => (
                          <option key={c} value={c.toLowerCase()}>
                            {c}
                          </option>
                        ))}
                    </select>
                    <div className="invalid-feedback">Por favor, selecciona una ciudad.</div>
                  </div>
                </div>

                {/* Dirección */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Dirección exacta (Mín. 5, Máx. 300 caracteres):</label>
                  <textarea
                    className={`form-control ${touched && !isAddressValid ? 'is-invalid' : ''}`}
                    id="direccion"
                    rows={2}
                    maxLength={300}
                    placeholder="Ej: Av. Los Motores 1024, Depto 302..."
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    required
                  ></textarea>
                  <div className="invalid-feedback">Ingresa una dirección con al menos 5 caracteres.</div>
                </div>

                <ActionButton type="submit" className="w-100 mt-4 py-2">
                  Registrarme
                </ActionButton>
              </form>

              <div className="text-center mt-4">
                <span className="text-muted small">¿Ya tienes cuenta? </span>
                <Link to="/login" className="small fw-bold text-decoration-none">
                  Inicia sesión aquí
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
