import { useState } from "react";
import BarraNavegacion from "../componentes/BarraNavegacion";
import PiePagina from "../componentes/PiePagina";
import TarjetaProducto from "../componentes/TarjetaProducto";
import { PRODUCTOS } from "../datos/Productos";

function Productos() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas");

  const categorias = ["Todas", "Filtros", "Frenos", "Baterías", "Lubricantes", "Motor", "Suspensión"];

  const productosFiltrados = PRODUCTOS.filter((producto) => {
    return categoriaSeleccionada === "Todas" || producto.categoria === categoriaSeleccionada;
  });

  return (
    <div className="d-flex flex-column min-vh-100">
      <BarraNavegacion />

      <main className="container mb-5">
        {/* ENCABEZADO DEL CATÁLOGO */}
        <div className="my-4">
          <h2 className="custom-title mb-1">Catálogo de Repuestos</h2>
          <p className="text-muted mb-0">
            Explora nuestros {PRODUCTOS.length} repuestos originales y certificados.
          </p>
        </div>

        {/* FILTROS POR CATEGORÍA EN TIEMPO REAL */}
        <div className="d-flex flex-wrap gap-2 mb-4">
          {categorias.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`btn btn-sm ${
                categoriaSeleccionada === cat ? "btn-dark fw-bold" : "btn-outline-secondary"
              }`}
              onClick={() => setCategoriaSeleccionada(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* GRILLA DE PRODUCTOS REUTILIZANDO TarjetaProducto */}
        {productosFiltrados.length > 0 ? (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {productosFiltrados.map((producto) => (
              <TarjetaProducto key={producto.id} producto={producto} />
            ))}
          </div>
        ) : (
          <div className="text-center py-5 my-5 bg-light rounded">
            <h5>No encontramos repuestos en esta categoría</h5>
            <p className="text-muted small">Selecciona otra categoría o restablece el filtro.</p>
            <button
              className="btn btn-outline-dark btn-sm mt-2"
              onClick={() => setCategoriaSeleccionada("Todas")}
            >
              Ver todos los productos
            </button>
          </div>
        )}
      </main>

      <PiePagina />
    </div>
  );
}

export default Productos;
