import { useState } from "react";
import Navbar from "../componentes/Navbar";
import Footer from "../componentes/Footer";
import ProductCard from "../componentes/ProductCard";
import { PRODUCTOS } from "../datos/Productos";

function Categorias() {
  const [categoriaActiva, setCategoriaActiva] = useState<string>("Filtros");

  const categorias = [
    { nombre: "Filtros", icono: "bi-funnel-fill", desc: "Aire, Aceite y Combustible" },
    { nombre: "Frenos", icono: "bi-disc-fill", desc: "Pastillas, Discos y Líquidos" },
    { nombre: "Baterías", icono: "bi-lightning-charge-fill", desc: "Partida rápida y libre mantención" },
    { nombre: "Lubricantes", icono: "bi-droplet-half", desc: "Aceites 100% sintéticos" },
    { nombre: "Motor", icono: "bi-gear-wide-connected", desc: "Correas, Bujías, Radiadores" },
    { nombre: "Suspensión", icono: "bi-speedometer", desc: "Amortiguadores y espirales" },
  ];

  const productosFiltrados = PRODUCTOS.filter(
    (p) => p.categoria.toLowerCase() === categoriaActiva.toLowerCase()
  );

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <main className="container mb-5">
        <div className="text-center my-4">
          <h2 className="custom-title mb-1">Repuestos por Categoría</h2>
          <p className="text-muted">
            Encuentra exactamente lo que tu modelo necesita seleccionando su familia de componentes.
          </p>
        </div>

        {/* SELECTOR DE CATEGORÍAS (FIGURA 4 DE LA RÚBRICA) */}
        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-6 g-3 mb-5">
          {categorias.map((cat) => (
            <div className="col" key={cat.nombre}>
              <button
                type="button"
                className={`card w-100 text-center p-3 border-0 shadow-sm product-card-hover h-100 ${
                  categoriaActiva === cat.nombre
                    ? "bg-warning text-dark border-2 border-dark"
                    : "bg-light text-dark"
                }`}
                onClick={() => setCategoriaActiva(cat.nombre)}
              >

                <h6 className="fw-bold mb-1">{cat.nombre}</h6>
                <small className="text-muted" style={{ fontSize: "0.75rem" }}>
                  {cat.desc}
                </small>
              </button>
            </div>
          ))}
        </div>

        {/* LISTADO DE REPUESTOS DE LA CATEGORÍA */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold mb-0">
            Categoría: <span className="text-primary">{categoriaActiva}</span> ({productosFiltrados.length})
          </h4>
        </div>

        {productosFiltrados.length > 0 ? (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {productosFiltrados.map((producto) => (
              <ProductCard key={producto.id} producto={producto} />
            ))}
          </div>
        ) : (
          <div className="alert alert-info text-center py-4">
            No hay repuestos registrados en esta categoría por el momento.
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Categorias;
