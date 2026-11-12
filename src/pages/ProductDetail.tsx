import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ActionButton } from '../components/Button/ActionButton';
import { useApp } from '../context/AppContext';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getProductById, addToCart } = useApp();

  const product = id ? getProductById(id) : undefined;

  if (!product) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-warning py-5">
          <i className="bi bi-exclamation-triangle fs-1 text-warning d-block mb-3"></i>
          <h4>Producto no encontrado</h4>
          <p className="text-muted">El repuesto que estás buscando no existe o fue descontinuado.</p>
          <Link to="/productos" className="btn btn-outline-dark mt-3">
            <i className="bi bi-arrow-left me-1"></i>Volver al Catálogo
          </Link>
        </div>
      </div>
    );
  }

  const isLowStock = product.stock > 0 && product.stock <= 5;
  const isOutOfStock = product.stock <= 0;

  const handleAddToCart = () => {
    const res = addToCart(product, 1);
    if (!res.success && res.message) {
      alert(res.message);
    }
  };

  return (
    <div className="container mb-5">
      {/* Migas de pan / Volver */}
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/" className="text-decoration-none">Inicio</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/productos" className="text-decoration-none">Productos</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {product.name}
          </li>
        </ol>
      </nav>

      <div className="row bg-white p-4 shadow-sm rounded-3">
        {/* Imagen del Producto */}
        <div className="col-md-5 text-center mb-4 mb-md-0 d-flex align-items-center justify-content-center">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid rounded"
            style={{ objectFit: 'contain', maxHeight: '400px', padding: '15px' }}
          />
        </div>

        {/* Información y Botones */}
        <div className="col-md-7">
          <span className="badge bg-secondary mb-2">{product.category}</span>
          <h2 className="fw-bold custom-title">{product.name}</h2>
          <h3 className="fw-bold text-dark mt-3">{product.formattedPrice}</h3>
          <p className="text-muted mt-3">{product.fullDesc}</p>

          <div className="d-flex align-items-center flex-wrap gap-3 mt-4">
            <ActionButton
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className="px-4"
              icon={isOutOfStock ? 'bi bi-x-circle' : 'bi bi-cart-plus'}
            >
              {isOutOfStock ? 'Agotado' : 'Añadir al Carrito'}
            </ActionButton>
            <span className="fw-bold text-dark">
              <i
                className={`bi ${
                  isOutOfStock
                    ? 'bi-x-circle-fill text-danger'
                    : isLowStock
                    ? 'bi-exclamation-circle-fill text-warning'
                    : 'bi-check-circle-fill text-success'
                } me-1`}
              ></i>
              {isOutOfStock ? 'Sin Stock Disponible' : `Stock Disponible: ${product.stock}`}
            </span>
          </div>

          <hr className="mt-4" />

          {/* Especificaciones Técnicas */}
          <h5 className="fw-bold mt-4 mb-3">Especificaciones Técnicas</h5>
          <table className="table table-striped table-bordered">
            <tbody>
              {Object.entries(product.specs).map(([specKey, specVal]) => (
                <tr key={specKey}>
                  <th scope="row" className="w-25 text-secondary">
                    {specKey}
                  </th>
                  <td>{specVal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
