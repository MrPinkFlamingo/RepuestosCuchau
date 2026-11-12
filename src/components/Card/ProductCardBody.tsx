import React from 'react';
import { Link } from 'react-router-dom';
import { ActionButton } from '../Button/ActionButton';
import { Product } from '../../data/products';
import { useApp } from '../../context/AppContext';

interface ProductCardBodyProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export const ProductCardBody: React.FC<ProductCardBodyProps> = ({
  product,
  onAddToCart,
}) => {
  const { addToCart, products } = useApp();

  // Obtener la versión reactiva del producto para stock actualizado
  const liveProduct = products.find((p) => p.id === product.id) || product;
  const isOutOfStock = liveProduct.stock <= 0;

  const handleBuy = () => {
    if (onAddToCart) {
      onAddToCart(liveProduct);
    } else {
      const res = addToCart(liveProduct, 1);
      if (!res.success && res.message) {
        alert(res.message);
      }
    }
  };

  return (
    <div className="card-body d-flex flex-column">
      <Link to={`/producto/${liveProduct.id}`} className="text-decoration-none text-dark">
        <h6 className="card-title text-truncate fw-bold" title={liveProduct.name}>
          {liveProduct.name}
        </h6>
      </Link>
      <p className="card-text text-muted small mb-2">{liveProduct.shortDesc}</p>
      <div className="mt-auto">
        <div className="d-flex justify-content-between align-items-center mb-1">
          <span className="fs-4 fw-bold text-dark">{liveProduct.formattedPrice}</span>
          <span
            className={`badge ${
              isOutOfStock
                ? 'bg-danger'
                : liveProduct.stock <= 5
                ? 'bg-warning text-dark'
                : 'bg-light text-secondary border'
            }`}
            style={{ fontSize: '0.75rem' }}
          >
            {isOutOfStock ? 'Sin Stock' : `Stock: ${liveProduct.stock}`}
          </span>
        </div>

        <ActionButton
          onClick={handleBuy}
          disabled={isOutOfStock}
          className="w-100 mt-2 d-block text-center"
          icon={isOutOfStock ? 'bi bi-x-circle' : 'bi bi-cart-plus'}
        >
          {isOutOfStock ? 'Agotado' : 'Comprar'}
        </ActionButton>
      </div>
    </div>
  );
};
