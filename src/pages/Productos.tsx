import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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
          {/* Producto 1 */}
          <div className="col">
            <div className="card h-100 border-0 shadow-sm product-card-hover">
              <Link to="/DetalleFiltro.html">
                <img
                  src="/img/FiltroAceiteBoschPremium.jpg"
                  className="card-img-top"
                  alt="Filtro de Aceite"
                  style={{ objectFit: "contain", height: "200px", padding: "15px", backgroundColor: "#fff" }}
                />
              </Link>
              <div className="card-body d-flex flex-column">
                <Link to="/DetalleFiltro.html" className="text-decoration-none text-dark">
                  <h6 className="card-title text-truncate">Filtro de Aceite Bosch Premium</h6>
                </Link>
                <p className="card-text text-muted small mb-2">Para motores bencineros 1.6 y 2.0</p>
                <div className="mt-auto">
                  <span className="fs-4 fw-bold text-dark">$8.990</span>
                  <Link to="/register.html" className="btn btn-custom-action w-100 mt-2 d-block">
                    <i className="bi bi-cart-plus"></i> Comprar
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Producto 2 */}
          <div className="col">
            <div className="card h-100 border-0 shadow-sm product-card-hover">
              <Link to="/DetallePastillas.html">
                <img
                  src="/img/JuegoDePastillasBrembo.jpg"
                  className="card-img-top"
                  alt="Pastillas"
                  style={{ objectFit: "contain", height: "200px", padding: "15px", backgroundColor: "#fff" }}
                />
              </Link>
              <div className="card-body d-flex flex-column">
                <Link to="/DetallePastillas.html" className="text-decoration-none text-dark">
                  <h6 className="card-title text-truncate">Juego Pastillas de Freno Brembo</h6>
                </Link>
                <p className="card-text text-muted small mb-2">Alta durabilidad, cero ruidos.</p>
                <div className="mt-auto">
                  <span className="fs-4 fw-bold text-dark">$35.000</span>
                  <Link to="/register.html" className="btn btn-custom-action w-100 mt-2 d-block">
                    <i className="bi bi-cart-plus"></i> Comprar
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Producto 3 */}
          <div className="col">
            <div className="card h-100 border-0 shadow-sm product-card-hover">
              <Link to="/DetalleBateria.html">
                <img
                  src="/img/BateriaHankook55MP.jpg"
                  className="card-img-top"
                  alt="Bateria"
                  style={{ objectFit: "contain", height: "200px", padding: "15px", backgroundColor: "#fff" }}
                />
              </Link>
              <div className="card-body d-flex flex-column">
                <Link to="/DetalleBateria.html" className="text-decoration-none text-dark">
                  <h6 className="card-title text-truncate">Batería Hankook 55AMP</h6>
                </Link>
                <p className="card-text text-muted small mb-2">Libre de mantención, partida rápida.</p>
                <div className="mt-auto">
                  <span className="fs-4 fw-bold text-dark">$55.990</span>
                  <Link to="/register.html" className="btn btn-custom-action w-100 mt-2 d-block">
                    <i className="bi bi-cart-plus"></i> Comprar
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Producto 4 */}
          <div className="col">
            <div className="card h-100 border-0 shadow-sm product-card-hover">
              <Link to="/DetalleAceite.html">
                <img
                  src="/img/AcaiteMobil5W-30.jpg"
                  className="card-img-top"
                  alt="Aceite"
                  style={{ objectFit: "contain", height: "200px", padding: "15px", backgroundColor: "#fff" }}
                />
              </Link>
              <div className="card-body d-flex flex-column">
                <Link to="/DetalleAceite.html" className="text-decoration-none text-dark">
                  <h6 className="card-title text-truncate">Aceite Mobil 1 Sintético 5W-30 (4L)</h6>
                </Link>
                <p className="card-text text-muted small mb-2">Máximo rendimiento y protección.</p>
                <div className="mt-auto">
                  <span className="fs-4 fw-bold text-dark">$42.500</span>
                  <Link to="/register.html" className="btn btn-custom-action w-100 mt-2 d-block">
                    <i className="bi bi-cart-plus"></i> Comprar
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Productos;
