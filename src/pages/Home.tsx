import React from 'react';
import { Banner } from '../components/Banner';
import { ProductCard } from '../components/Card/ProductCard';
import { useApp } from '../context/AppContext';

export const Home: React.FC = () => {
  const { products } = useApp();

  return (
    <div className="container mb-5">
      {/* BANNER PROMOCIONAL */}
      <Banner />

      {/* SECCIÓN: PRODUCTOS DESTACADOS */}
      <div className="d-flex justify-content-between align-items-center mb-3 mt-5">
        <h3 className="custom-title mb-0">Productos Destacados</h3>
      </div>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
        {products.map((product) => (
          <div className="col" key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};
