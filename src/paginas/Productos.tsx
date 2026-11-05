import { useState } from "react";
import BarraNavegacion from "../componentes/BarraNavegacion";
import PiePagina from "../componentes/PiePagina";
import TarjetaProducto from "../componentes/TarjetaProducto";
import { PRODUCTOS } from "../datos/Productos";

function Productos() {
  const [busqueda, setBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas");

  const categorias = ["Todas", "Filtros", "Frenos", "Baterías", "Lubricantes", "Motor", "Suspensión"];

  const productosFiltrados = PRODUCTOS.filter((producto) => {
    const coincideTexto =
      producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      producto.descripcion.toLowerCase().includes(busqueda.toLowerCase());

    const coincideCategoria =
      categoriaSeleccionada === "Todas" || producto.categoria === categoriaSeleccionada;

    return coincideTexto && coincideCategoria;
  });

  return (
    <div className="d-flex flex-column min-vh-100">
      <BarraNavegacion />

      <main className="container mb-5">
        {/* ENCABEZADO DEL CATÁLOGO */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center my-4 gap-3">
          <div>
            <h2 className="custom-title mb-1">Catálogo de Repuestos</h2>
            <p className="text-muted mb-0">
              Explora nuestros {PRODUCTOS.length} repuestos originales y certificados.
            </p>
          </div>

          {/* BUSCADOR REACTIVO EN TIEMPO REAL */}
          <div className="col-12 col-md-5">
            <div className="input-group">
              <span className="input-group-text bg-white">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Buscar por repuesto, marca o modelo..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
              {busqueda && (
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => setBusqueda("")}
                  title="Limpiar búsqueda"
                >
                  <i className="bi bi-x-lg"></i>
                </button>
              )}
            </div>
          </div>
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
            <i className="bi bi-emoji-frown fs-1 text-muted mb-2 d-block"></i>
            <h5>No encontramos repuestos que coincidan con tu búsqueda</h5>
            <p className="text-muted small">Intenta con otro término o limpia los filtros.</p>
            <button
              className="btn btn-outline-dark btn-sm mt-2"
              onClick={() => {
                setBusqueda("");
                setCategoriaSeleccionada("Todas");
              }}
            >
              Restablecer catálogo
            </button>
          </div>
        )}
      </main>

      <PiePagina />
    </div>
  );
}

export default Productos;
