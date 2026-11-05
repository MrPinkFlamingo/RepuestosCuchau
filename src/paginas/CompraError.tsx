import { useLocation, Link, useNavigate } from "react-router-dom";
import BarraNavegacion from "../componentes/BarraNavegacion";
import PiePagina from "../componentes/PiePagina";

function CompraError() {
  const location = useLocation();
  const navigate = useNavigate();
  const datos = location.state;

  return (
    <div className="d-flex flex-column min-vh-100">
      <BarraNavegacion />

      <main className="container mb-5">
        <div className="row justify-content-center">
          <div className="col-lg-9">
            <div className="card shadow-sm border-0 p-4 p-md-5">
              {/* ENCABEZADO DE ERROR (FIGURA 8 DE LA RÚBRICA) */}
              <div className="alert alert-danger d-flex align-items-center justify-content-between p-3 mb-4">
                <div className="d-flex align-items-center gap-2">
                  <i className="bi bi-x-circle-fill fs-3 text-danger"></i>
                  <div>
                    <h4 className="alert-heading fw-bold mb-0">
                      No se pudo realizar el pago. nro #20240705
                    </h4>
                    <small className="text-muted">
                      Ocurrió un problema procesando tu tarjeta o transacción bancaria.
                    </small>
                  </div>
                </div>
              </div>

              {/* BOTÓN REINTENTAR PAGO (FIGURA 8) */}
              <div className="text-center my-3">
                <button
                  type="button"
                  className="btn btn-success fw-bold px-4 py-2 fs-5"
                  onClick={() => navigate("/pago")}
                >
                  <i className="bi bi-arrow-repeat me-2"></i> VOLVER A REALIZAR EL PAGO
                </button>
              </div>

              {/* DETALLE DEL INTENTO */}
              {datos && (
                <div className="bg-light p-4 rounded mt-4">
                  <h6 className="fw-bold mb-3">Detalle de la compra rechazada:</h6>
                  <p className="small text-muted mb-1">
                    <strong>Cliente:</strong> {datos.cliente?.nombre} {datos.cliente?.apellidos} (
                    {datos.cliente?.correo})
                  </p>
                  <p className="small text-muted mb-1">
                    <strong>Dirección de entrega:</strong> {datos.cliente?.calle},{" "}
                    {datos.cliente?.comuna}
                  </p>
                  <p className="small text-muted mb-3">
                    <strong>Total a pagar:</strong> ${datos.total?.toLocaleString("es-CL")}
                  </p>
                  <small className="text-danger d-block">
                    * Tu dinero no fue descontado. Puedes verificar tus datos e intentar nuevamente.
                  </small>
                </div>
              )}

              <div className="text-center mt-4 pt-3 border-top">
                <Link to="/carrito" className="btn btn-outline-secondary btn-sm me-2">
                  <i className="bi bi-cart3 me-1"></i> Volver al Carrito
                </Link>
                <Link to="/" className="btn btn-outline-dark btn-sm">
                  Ir al Inicio
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <PiePagina />
    </div>
  );
}

export default CompraError;
