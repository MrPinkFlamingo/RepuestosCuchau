import React, { useState } from 'react';
import { ProductCard } from '../components/Card/ProductCard';
import { useApp } from '../context/AppContext';

export const Products: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const { products } = useApp();

  const categories = ['Todos', 'Filtros', 'Frenos', 'Baterías', 'Aceites'];

  const filteredProducts =
    selectedCategory === 'Todos'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="container mb-5">
      {/* SECCIÓN: TODOS LOS PRODUCTOS */}
      <div className="mb-4 mt-2">
        <h3 className="custom-title mb-0">Catálogo de Productos</h3>
        <p className="text-muted">Explora todos nuestros repuestos disponibles con la mejor garantía.</p>
      </div>

      {/* Filtros por Categoría */}
      <div className="d-flex flex-wrap gap-2 mb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`btn btn-sm ${
              selectedCategory === cat ? 'btn-primary' : 'btn-outline-secondary'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4 mb-5">
        {filteredProducts.map((product) => (
          <div className="col" key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};
