import { Link } from "react-router-dom";
import BarraNavegacion from "../componentes/BarraNavegacion";
import Banner from "../componentes/Banner";
import PiePagina from "../componentes/PiePagina";
import TarjetaProducto from "../componentes/TarjetaProducto";
import { PRODUCTOS } from "../datos/Productos";

function Inicio() {
  const destacados = PRODUCTOS.slice(0, 4);

  return (
    <div className="d-flex flex-column min-vh-100">
      <BarraNavegacion />

      <main className="container mb-5">
        {/* BANNER PROMOCIONAL */}
        <Banner />

        {/* SECCIÓN CATEGORÍAS RÁPIDAS (FIGURA 1 DE LA RÚBRICA) */}
        <section className="mb-5">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3 className="custom-title mb-0">Categorías Principales</h3>
            <Link to="/categorias" className="btn btn-outline-dark btn-sm">
              Ver todas las categorías <i className="bi bi-arrow-right"></i>
            </Link>
          </div>

          <div className="row row-cols-2 row-cols-md-4 g-3 text-center">
            <div className="col">
              <Link
                to="/categorias"
                className="text-decoration-none card h-100 p-3 shadow-sm border-0 bg-light text-dark product-card-hover"
              >
                <i className="bi bi-funnel fs-1 text-primary mb-2"></i>
                <h6 className="fw-bold mb-0">Filtros</h6>
                <small className="text-muted">Aire, Aceite, Combustible</small>
              </Link>
            </div>
            <div className="col">
              <Link
                to="/categorias"
                className="text-decoration-none card h-100 p-3 shadow-sm border-0 bg-light text-dark product-card-hover"
              >
                <i className="bi bi-disc fs-1 text-danger mb-2"></i>
                <h6 className="fw-bold mb-0">Frenos</h6>
                <small className="text-muted">Pastillas, Discos, Líquidos</small>
              </Link>
            </div>
            <div className="col">
              <Link
                to="/categorias"
                className="text-decoration-none card h-100 p-3 shadow-sm border-0 bg-light text-dark product-card-hover"
              >
                <i className="bi bi-lightning-charge fs-1 text-warning mb-2"></i>
                <h6 className="fw-bold mb-0">Baterías</h6>
                <small className="text-muted">45AH, 55AH, 70AH</small>
              </Link>
            </div>
            <div className="col">
              <Link
                to="/categorias"
                className="text-decoration-none card h-100 p-3 shadow-sm border-0 bg-light text-dark product-card-hover"
              >
                <i className="bi bi-droplet-half fs-1 text-info mb-2"></i>
                <h6 className="fw-bold mb-0">Lubricantes</h6>
                <small className="text-muted">Sintéticos 5W-30, 10W-40</small>
              </Link>
            </div>
          </div>
        </section>

        {/* SECCIÓN PRODUCTOS DESTACADOS */}
        <section className="mb-5">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h3 className="custom-title mb-0">Productos Destacados</h3>
              <p className="text-muted small mb-0">Lo más buscado para tu auto con entrega rápida</p>
            </div>
            <Link to="/productos" className="btn btn-outline-dark btn-sm">
              Ver catálogo completo <i className="bi bi-arrow-right"></i>
            </Link>
          </div>

          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
            {destacados.map((producto) => (
              <TarjetaProducto key={producto.id} producto={producto} />
            ))}
          </div>
        </section>

        {/* BANNER SECUNDARIO DE PROMOCIÓN A OFERTAS */}
        <section className="p-4 rounded bg-warning-subtle border border-warning d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
          <div className="d-flex align-items-center gap-3">
            <i className="bi bi-percent fs-1 text-danger"></i>
            <div>
              <h5 className="fw-bold mb-1">¿Buscando los mejores precios de la temporada?</h5>
              <p className="text-muted mb-0 small">
                Revisa nuestra sección exclusiva con repuestos certificados en oferta hasta agotar stock.
              </p>
            </div>
          </div>
          <Link to="/ofertas" className="btn btn-danger text-nowrap fw-semibold px-4">
            <i className="bi bi-fire me-1"></i> Ir a Ofertas
          </Link>
        </section>
      </main>

      <PiePagina />
    </div>
  );
}

export default Inicio;
