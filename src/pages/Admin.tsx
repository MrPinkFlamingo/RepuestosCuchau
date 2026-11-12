import React from 'react';
import { Link } from 'react-router-dom';

export const Admin: React.FC = () => {
  return (
    <div className="container mt-4 flex-grow-1 mb-5">
      <div className="d-flex align-items-center mb-4">
        <span className="badge bg-dark me-2 fs-6">ADMIN</span>
        <h2 className="custom-title mb-0">Bienvenido, Administrador</h2>
      </div>

      <div className="row g-4 text-center justify-content-center">
        {/* Opción 1: Lista de Productos */}
        <div className="col-md-4">
          <div className="card shadow-sm h-100 border-0 p-4 product-card-hover">
            <i className="bi bi-box-seam text-warning" style={{ fontSize: '3rem' }}></i>
            <h5 className="fw-bold mt-3">Lista de Productos</h5>
            <p className="text-muted small">
              Visualizar el catálogo completo de repuestos y sus detalles técnicos.
            </p>
            <Link to="/gestion-productos?rol=admin" className="btn btn-outline-dark mt-2 w-100">
              Ver Productos
            </Link>
          </div>
        </div>

        {/* Opción 2: Lista de Órdenes */}
        <div className="col-md-4">
          <div className="card shadow-sm h-100 border-0 p-4 product-card-hover">
            <i className="bi bi-receipt text-warning" style={{ fontSize: '3rem' }}></i>
            <h5 className="fw-bold mt-3">Lista de Órdenes</h5>
            <p className="text-muted small">
              Revisar el historial de ventas, órdenes generadas y su estado detallado.
            </p>
            <Link to="/gestion-ordenes?rol=admin" className="btn btn-outline-dark mt-2 w-100">
              Ver Órdenes
            </Link>
          </div>
        </div>

        {/* Opción 3: Gestión de Usuarios */}
        <div className="col-md-4">
          <div className="card shadow-sm h-100 border-0 p-4 product-card-hover">
            <i className="bi bi-people-fill text-warning" style={{ fontSize: '3rem' }}></i>
            <h5 className="fw-bold mt-3">Gestión de Usuarios</h5>
            <p className="text-muted small">
              Crear, editar o eliminar cuentas de clientes.
            </p>
            <Link to="/gestion-usuarios?rol=admin" className="btn btn-outline-dark mt-2 w-100">
              Administrar Usuarios
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
