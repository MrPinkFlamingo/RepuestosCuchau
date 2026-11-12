import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';

interface ManagementHeaderProps {
  activeTab: 'productos' | 'ordenes' | 'usuarios';
}

export const ManagementHeader: React.FC<ManagementHeaderProps> = ({ activeTab }) => {
  const [searchParams] = useSearchParams();
  const rol = searchParams.get('rol') || 'admin';
  const dashboardPath = '/admin';

  return (
    <nav className="navbar navbar-expand-lg navbar-dark mb-4" style={{ backgroundColor: '#212529' }}>
      <div className="container">
        <Link className="navbar-brand fw-bold text-warning" to={dashboardPath}>
          <i className="bi bi-gear-fill me-2"></i>Panel de Gestión ({'Administrador'})
        </Link>

        <div className="collapse navbar-collapse show" id="navGestion">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${activeTab === 'productos' ? 'active text-warning fw-bold' : ''}`}
                to={`/gestion-productos?rol=${rol}`}
              >
                Lista de Productos
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${activeTab === 'ordenes' ? 'active text-warning fw-bold' : ''}`}
                to={`/gestion-ordenes?rol=${rol}`}
              >
                Lista de Órdenes
              </Link>
            </li>
            <li className="nav-item" id="nav-usuarios-item">
              <Link
                className={`nav-link ${activeTab === 'usuarios' ? 'active text-warning fw-bold' : ''}`}
                to={`/gestion-usuarios?rol=${rol}`}
              >
                Gestión de Usuarios
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link text-white" to={dashboardPath}>
                <i className="bi bi-arrow-left-circle me-1"></i> Volver al Dashboard
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
