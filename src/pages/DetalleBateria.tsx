import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function DetalleBateria() {
  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <Navbar paginaActiva="Productos" />

      {/* CONTENIDO DE PRODUCTO */}
      <div className="container mb-5">
        <div className="row bg-white p-4 shadow-sm rounded-3">
          {/* Imagen del Producto */}
          <div className="col-md-5 text-center mb-4 mb-md-0 d-flex align-items-center justify-content-center">
            <img
              src="/img/BateriaHankook55MP.jpg"
              alt="Batería Hankook 55MP"
              className="img-fluid rounded"
              style={{ objectFit: "contain", maxHeight: "400px", padding: "15px" }}
            />
          </div>

          {/* Información y Botones */}
          <div className="col-md-7">
            <span className="badge bg-secondary mb-2">Baterías</span>
            <h2 className="fw-bold custom-title">Batería Hankook 55AMP</h2>
            <h3 className="fw-bold text-dark mt-3">$55.990</h3>
            <p className="text-muted mt-3">
              Batería Hankook 100% libre de mantenimiento. Ofrece una potencia de arranque superior y mayor resistencia a las altas temperaturas, ideal para vehículos con exigencias eléctricas estándar.
            </p>

            <div className="d-flex align-items-center mt-4">
              <Link to="/register.html" className="btn btn-custom-action px-4 me-3">
                <i className="bi bi-cart-plus"></i> Añadir al Carrito
              </Link>
              <span className="text-dark fw-bold">
                <i className="bi bi-check-circle-fill"></i> Stock Disponible: 20
              </span>
            </div>

            <hr className="mt-4" />

            {/* Especificaciones Técnicas */}
            <h5 className="fw-bold mt-4 mb-3">Especificaciones Técnicas</h5>
            <table className="table table-striped table-bordered">
              <tbody>
                <tr>
                  <th scope="row" className="w-25 text-secondary">
                    Fabricante
                  </th>
                  <td>Hankook AtlasBX</td>
                </tr>
                <tr>
                  <th scope="row" className="text-secondary">
                    Código SKU
                  </th>
                  <td>BAT-HAN-55MP</td>
                </tr>
                <tr>
                  <th scope="row" className="text-secondary">
                    Compatibilidad
                  </th>
                  <td>Hatchbacks y Sedán Compactos (12V)</td>
                </tr>
                <tr>
                  <th scope="row" className="text-secondary">
                    Garantía
                  </th>
                  <td>12 Meses</td>
                </tr>
                <tr>
                  <th scope="row" className="text-secondary">
                    Capacidad / CCA
                  </th>
                  <td>55 Ah / 450A</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default DetalleBateria;
