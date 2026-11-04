import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function DetallePastillas() {
  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <Navbar paginaActiva="Productos" />

      {/* CONTENIDO DE PRODUCTO */}
      <div className="container mb-5">
        <div className="row bg-white p-4 shadow-sm rounded-3">
          {/* Imagen del Producto */}
          <div className="col-md-5 text-center mb-4 mb-md-0 d-flex align-items-center justify-content-center">
            <img
              src="/img/JuegoDePastillasBrembo.jpg"
              alt="Pastillas de Freno Brembo"
              className="img-fluid rounded"
              style={{ objectFit: "contain", maxHeight: "400px", padding: "15px" }}
            />
          </div>

          {/* Información y Botones */}
          <div className="col-md-7">
            <span className="badge bg-secondary mb-2">Frenos</span>
            <h2 className="fw-bold custom-title">Juego Pastillas de Freno Brembo</h2>
            <h3 className="fw-bold text-dark mt-3">$35.000</h3>
            <p className="text-muted mt-3">
              Juego completo de pastillas de freno delanteras Brembo Premium. Su compuesto cerámico avanzado reduce el polvo, minimiza el ruido y garantiza una frenada precisa y segura bajo cualquier condición climática.
            </p>

            <div className="d-flex align-items-center mt-4">
              <Link to="/register.html" className="btn btn-custom-action px-4 me-3">
                <i className="bi bi-cart-plus"></i> Añadir al Carrito
              </Link>
              <span className="text-dark fw-bold">
                <i className="bi bi-check-circle-fill"></i> Stock Disponible: 12
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
                  <td>Brembo S.p.A</td>
                </tr>
                <tr>
                  <th scope="row" className="text-secondary">
                    Código SKU
                  </th>
                  <td>FRE-BRE-P1234</td>
                </tr>
                <tr>
                  <th scope="row" className="text-secondary">
                    Compatibilidad
                  </th>
                  <td>Audi A3, VW Golf Mk7, Seat Leon</td>
                </tr>
                <tr>
                  <th scope="row" className="text-secondary">
                    Garantía
                  </th>
                  <td>6 Meses o 10.000 km</td>
                </tr>
                <tr>
                  <th scope="row" className="text-secondary">
                    Posición
                  </th>
                  <td>Eje Delantero</td>
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

export default DetallePastillas;
