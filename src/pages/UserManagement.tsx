import React, { useState } from 'react';
import { UserItem } from '../data/users';
import { ManagementHeader } from '../components/ManagementHeader';
import { useApp } from '../context/AppContext';
import { validarRUT, validarCorreo, validarTextoSimple } from '../utils/validations';

export const UserManagement: React.FC = () => {
  const { users, registerUser, updateUser, deleteUser } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<UserItem | null>(null);

  const [formName, setFormName] = useState('');
  const [formRut, setFormRut] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPassword, setFormPassword] = useState('');
  const [formRole, setFormRole] = useState<'Administrador' | 'Vendedor' | 'Cliente'>('Cliente');
  const [formError, setFormError] = useState<string | null>(null);

  const handleOpenNew = () => {
    setEditingUser(null);
    setFormName('');
    setFormRut('');
    setFormEmail('');
    setFormPassword('1');
    setFormRole('Cliente');
    setFormError(null);
    setShowModal(true);
  };

  const handleEdit = (user: UserItem) => {
    setEditingUser(user);
    setFormName(user.name);
    setFormRut(user.rut);
    setFormEmail(user.email);
    setFormPassword(user.password || '1');
    setFormRole(user.role);
    setFormError(null);
    setShowModal(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!validarTextoSimple(formName, 2)) {
      setFormError('El nombre debe tener al menos 2 caracteres y contener solo letras.');
      return;
    }

    if (!validarRUT(formRut)) {
      setFormError('El RUT ingresado no es válido según el algoritmo chileno (Módulo 11).');
      return;
    }

    if (!validarCorreo(formEmail)) {
      setFormError('El correo debe pertenecer a @duoc.cl, @profesor.duoc.cl o @gmail.com.');
      return;
    }

    const cleanEmail = formEmail.trim().toLowerCase();

    if (editingUser) {
      updateUser({
        ...editingUser,
        name: formName.trim(),
        rut: formRut.trim(),
        email: cleanEmail,
        password: formPassword || editingUser.password,
        role: formRole,
      });
    } else {
      // Validar duplicado de correo
      if (users.some((u) => u.email.trim().toLowerCase() === cleanEmail)) {
        setFormError('Ya existe un usuario con este correo electrónico.');
        return;
      }

      const newId = `USR-00${users.length + 1}`;
      registerUser({
        id: newId,
        name: formName.trim(),
        rut: formRut.trim(),
        email: cleanEmail,
        password: formPassword || '1',
        role: formRole,
        status: 'Activo',
      });
    }
    setShowModal(false);
  };

  const toggleStatus = (user: UserItem) => {
    updateUser({
      ...user,
      status: user.status === 'Activo' ? 'Inactivo' : 'Activo',
    });
  };

  return (
    <div className="flex-grow-1 mb-5">
      <ManagementHeader activeTab="usuarios" />

      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
          <h2 className="custom-title mb-0">Gestión de Usuarios Registrados</h2>
          <button className="btn btn-warning fw-bold" onClick={handleOpenNew}>
            <i className="bi bi-person-plus-fill me-1"></i> Nuevo Usuario
          </button>
        </div>

        {/* Formulario reactivo desplegable */}
        {showModal && (
          <div className="card shadow-sm border-0 mb-4 p-4 bg-light">
            <h5 className="fw-bold mb-3">
              {editingUser ? `Editar Usuario (${editingUser.id})` : 'Registrar Nuevo Usuario'}
            </h5>

            {formError && (
              <div className="alert alert-danger py-2 small mb-3">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                {formError}
              </div>
            )}

            <form onSubmit={handleSave}>
              <div className="row g-3">
                <div className="col-md-3">
                  <label className="form-label small fw-bold">Nombre Completo</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    value={formName}
                    placeholder="Ej: Pedro Soto"
                    onChange={(e) => setFormName(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label small fw-bold">RUT</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    value={formRut}
                    placeholder="12.345.678-9"
                    onChange={(e) => setFormRut(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label small fw-bold">Correo Electrónico</label>
                  <input
                    type="email"
                    className="form-control form-control-sm"
                    value={formEmail}
                    placeholder="ejemplo@duoc.cl"
                    onChange={(e) => setFormEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label small fw-bold">Rol</label>
                  <select
                    className="form-select form-select-sm"
                    value={formRole}
                    onChange={(e) =>
                      setFormRole(e.target.value as 'Administrador' | 'Vendedor' | 'Cliente')
                    }
                  >
                    <option value="Cliente">Cliente</option>
                    <option value="Vendedor">Vendedor</option>
                    <option value="Administrador">Administrador</option>
                  </select>
                </div>
              </div>
              <div className="mt-3 d-flex gap-2 justify-content-end">
                <button
                  type="button"
                  className="btn btn-sm btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn btn-sm btn-success">
                  <i className="bi bi-check-circle me-1"></i> Guardar
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
                  {users.map((u) => (
                    <tr key={u.id}>
                      <td className="fw-bold">{u.id}</td>
                      <td>{u.name}</td>
                      <td>{u.rut}</td>
                      <td>{u.email}</td>
                      <td>
                        <span
                          className={`badge rounded-pill ${
                            u.role === 'Administrador'
                              ? 'bg-dark'
                              : u.role === 'Vendedor'
                              ? 'bg-warning text-dark'
                              : 'bg-secondary'
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td>
                        <button
                          onClick={() => toggleStatus(u)}
                          className={`badge rounded-pill border-0 ${
                            u.status === 'Activo' ? 'bg-success text-white' : 'bg-secondary text-white'
                          }`}
                          style={{ cursor: 'pointer' }}
                          title="Click para cambiar estado"
                        >
                          {u.status}
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-dark"
                          onClick={() => handleEdit(u)}
                        >
                          <i className="bi bi-pencil me-1"></i> Editar
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger ms-2"
                          onClick={() => deleteUser(u.id)}
                        >
                          <i className="bi bi-trash me-1"></i> Borrar
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
    </div>
  );
};
