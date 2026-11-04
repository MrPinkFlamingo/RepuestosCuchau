import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function DetalleAceite() {
  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <Navbar paginaActiva="Productos" />

      {/* CONTENIDO DE PRODUCTO */}
      <div className="container mb-5">
        <div className="row bg-white p-4 shadow-sm rounded-3">
          {/* Imagen del Producto */}
          <div className="col-md-5 text-center mb-4 mb-md-0 d-flex align-items-center justify-content-center">
            <img
              src="/img/AcaiteMobil5W-30.jpg"
              alt="Aceite Motor Mobil 1 5W-30"
              className="img-fluid rounded"
              style={{ objectFit: "contain", maxHeight: "400px", padding: "15px" }}
            />
          </div>

          {/* Información y Botones */}
          <div className="col-md-7">
            <span className="badge bg-secondary mb-2">Aceites</span>
            <h2 className="fw-bold custom-title">Aceite Mobil 1 Sintético 5W-30 (4L)</h2>
            <h3 className="fw-bold text-dark mt-3">$42.500</h3>
            <p className="text-muted mt-3">
              Aceite de motor 100% sintético avanzado diseñado para ofrecer un poder de limpieza excepcional, protección contra el desgaste y un rendimiento general superior. Ayuda a mantener tu motor funcionando como nuevo en cualquier condición de conducción.
            </p>

            <div className="d-flex align-items-center mt-4">
              <Link to="/register.html" className="btn btn-custom-action px-4 me-3">
                <i className="bi bi-cart-plus"></i> Añadir al Carrito
              </Link>
              <span className="text-dark fw-bold">
                <i className="bi bi-exclamation-circle-fill"></i> Stock Disponible: 2
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
                  <td>ExxonMobil</td>
                </tr>
                <tr>
                  <th scope="row" className="text-secondary">
                    Código SKU
                  </th>
                  <td>LUB-MOB-5W30-5L</td>
                </tr>
                <tr>
                  <th scope="row" className="text-secondary">
                    Compatibilidad
                  </th>
                  <td>Motores a Gasolina y Diésel (Sin filtro DPF)</td>
                </tr>
                <tr>
                  <th scope="row" className="text-secondary">
                    Garantía
                  </th>
                  <td>No aplica (Consumible)</td>
                </tr>
                <tr>
                  <th scope="row" className="text-secondary">
                    Viscosidad SAE
                  </th>
                  <td>5W-30</td>
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

export default DetalleAceite;
