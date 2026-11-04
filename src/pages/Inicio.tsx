import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Tarjeta from "../components/Tarjeta";
import { PRODUCTOS } from "../data/Producto";

function Inicio() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar paginaActiva="Inicio" />

      <div className="container">
        {/* BANNER PROMOCIONAL */}
        <div
          className="p-4 p-md-5 mb-4 text-white rounded bg-dark"
          style={{
            background:
              "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/img/AutoInicio.jpg') center/cover",
          }}
        >
          <div className="col-md-6 px-0">
            <h1 className="display-4 fw-bold">Descuentos Explosivos</h1>
            <p className="lead my-3">
              Hasta un 40% de descuento en pastillas de freno y discos para
              todas las marcas. ¡Prepara tu auto para el viaje seguro!
            </p>
          </div>
        </div>

        {/* SECCIÓN: DESTACADOS */}
        <div className="d-flex justify-content-between align-items-center mb-3 mt-5">
          <h3 className="custom-title mb-0">Productos Destacados</h3>
        </div>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4 mb-5">
          {PRODUCTOS.map((producto) => (
            <div className="col" key={producto.id}>
              <Tarjeta
                id={producto.id}
                urlImagen={producto.urlImagen}
                altImagen={producto.altImagen}
                titulo={producto.nombre}
                texto={producto.descripcion}
              >
                <div className="mt-auto">
                  <span className="fs-4 fw-bold text-dark">
                    ${producto.precio}
                  </span>
                  <a
                    href="/register.html"
                    className="btn btn-custom-action w-100 mt-2 d-block"
                  >
                    <i className="bi bi-cart-plus"></i> Comprar
                  </a>
                </div>
              </Tarjeta>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Inicio;
