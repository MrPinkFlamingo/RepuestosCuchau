import Navbar from "../componentes/Navbar";
import Footer from "../componentes/Footer";
import Banner from "../componentes/Banner";
import ProductCard from "../componentes/ProductCard";
import { PRODUCTOS } from "../datos/Productos";

function Ofertas() {
  const productosEnOferta = PRODUCTOS.filter((p) => p.enOferta);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <main className="container mb-5">
        <Banner
          titulo="Zona de Ofertas y Descuentos"
          subtitulo="Aprovecha rebajas de hasta un 25% en pastillas, filtros, correas y lubricantes por tiempo limitado."
          descuento="HASTA 25% OFF"
        />

        <div className="d-flex justify-content-between align-items-center mb-4 mt-4">
          <div>
            <h3 className="custom-title mb-0">
              <i className="bi bi-fire text-danger me-2"></i> Repuestos con Precio Rebajado
            </h3>
            <p className="text-muted small mb-0">
              Todos los productos mostrados cuentan con descuento directo aplicado al carrito.
            </p>
          </div>
          <span className="badge bg-danger fs-6 px-3 py-2">
            {productosEnOferta.length} Ofertas Activas
          </span>
        </div>

        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {productosEnOferta.map((producto) => (
            <ProductCard key={producto.id} producto={producto} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Ofertas;
