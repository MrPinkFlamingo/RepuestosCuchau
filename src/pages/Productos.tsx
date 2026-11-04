import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Tarjeta from "../components/Tarjeta";
import { PRODUCTOS } from "../data/Producto";

function Productos() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar paginaActiva="Productos" />

      <div className="container">
        {/* SECCIÓN: TODOS LOS PRODUCTOS */}
        <div className="mb-4 mt-4">
          <h3 className="custom-title mb-0">Catálogo de Productos</h3>
          <p className="text-muted">Explora todos nuestros repuestos disponibles.</p>
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
                  <span className="fs-4 fw-bold text-dark">${producto.precio}</span>
                  <a href="/register.html" className="btn btn-custom-action w-100 mt-2 d-block">
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

export default Productos;