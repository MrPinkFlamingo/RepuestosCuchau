import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../data/products';
import { ProductCardBody } from './ProductCardBody';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
}) => {
  return (
    <div className="card h-100 border-0 shadow-sm product-card-hover">
      <Link to={`/producto/${product.id}`} className="text-center d-block">
        <img
          src={product.image}
          className="card-img-top"
          alt={product.name}
          style={{
            objectFit: 'contain',
            height: '200px',
            padding: '15px',
            backgroundColor: '#fff',
          }}
        />
      </Link>
      <ProductCardBody product={product} onAddToCart={onAddToCart} />
    </div>
  );
};
