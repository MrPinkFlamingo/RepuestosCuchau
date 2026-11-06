import { Link } from "react-router-dom";
import Navbar from "../componentes/Navbar";
import Banner from "../componentes/Banner";
import Footer from "../componentes/Footer";
import ProductCard from "../componentes/ProductCard";
import { PRODUCTOS } from "../datos/Productos";

function Inicio() {
  const destacados = PRODUCTOS.slice(0, 4);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <main className="container mb-5">
        {/* BANNER PROMOCIONAL */}
        <Banner />

        {/* SECCIÓN CATEGORÍAS RÁPIDAS */}
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
                className="text-decoration-none card h-100 p-3 shadow-sm border-0 bg-light text-dark product-card-hover justify-content-center"
              >
                <h6 className="fw-bold mb-1">Filtros</h6>
                <small className="text-muted">Aire, Aceite, Combustible</small>
              </Link>
            </div>
            <div className="col">
              <Link
                to="/categorias"
                className="text-decoration-none card h-100 p-3 shadow-sm border-0 bg-light text-dark product-card-hover justify-content-center"
              >
                <h6 className="fw-bold mb-1">Frenos</h6>
                <small className="text-muted">Pastillas, Discos, Líquidos</small>
              </Link>
            </div>
            <div className="col">
              <Link
                to="/categorias"
                className="text-decoration-none card h-100 p-3 shadow-sm border-0 bg-light text-dark product-card-hover justify-content-center"
              >
                <h6 className="fw-bold mb-1">Baterías</h6>
                <small className="text-muted">45AH, 55AH, 70AH</small>
              </Link>
            </div>
            <div className="col">
              <Link
                to="/categorias"
                className="text-decoration-none card h-100 p-3 shadow-sm border-0 bg-light text-dark product-card-hover justify-content-center"
              >
                <h6 className="fw-bold mb-1">Lubricantes</h6>
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
              <ProductCard key={producto.id} producto={producto} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Inicio;
