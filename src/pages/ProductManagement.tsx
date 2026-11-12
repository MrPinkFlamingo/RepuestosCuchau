import React from 'react';
import { Link } from 'react-router-dom';
import { ManagementHeader } from '../components/ManagementHeader';
import { useApp } from '../context/AppContext';

export const ProductManagement: React.FC = () => {
  const { products } = useApp();

  return (
    <div className="flex-grow-1 mb-5">
      <ManagementHeader activeTab="productos" />

      <div className="container">
        <h2 className="mb-4 custom-title" id="titulo-productos">
          Catálogo de Repuestos
        </h2>

        <div className="card shadow-sm border-0">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover table-striped mb-0 text-center align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>Cod.</th>
                    <th>Imagen</th>
                    <th>Nombre y Descripción</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((item) => (
                    <tr key={item.code}>
                      <td className="fw-bold">{item.code}</td>
                      <td style={{ width: '80px' }}>
                        <img
                          src={item.image}
                          className="img-fluid rounded bg-white p-1"
                          alt={item.name}
                          style={{ maxHeight: '50px' }}
                        />
                      </td>
                      <td className="text-start">
                        <strong>{item.name}</strong>
                        <br />
                        <span className="text-muted small">{item.shortDesc}</span>
                      </td>
                      <td>
                        <span className="badge rounded-pill bg-secondary">{item.category}</span>
                      </td>
                      <td className="fw-bold text-dark">{item.formattedPrice}</td>
                      <td>
                        <span
                          className={`badge rounded-pill ${
                            item.stock <= 0
                              ? 'bg-danger text-white'
                              : item.stock <= 5
                              ? 'bg-dark'
                              : item.stock <= 15
                              ? 'bg-warning text-dark'
                              : 'bg-secondary'
                          }`}
                        >
                          {item.stock <= 0 ? 'Agotado' : item.stock}
                        </span>
                      </td>
                      <td>
                        <Link
                          to={`/producto/${item.id}`}
                          className="btn btn-sm btn-outline-dark"
                        >
                          <i className="bi bi-eye me-1"></i> Detalle
                        </Link>
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
