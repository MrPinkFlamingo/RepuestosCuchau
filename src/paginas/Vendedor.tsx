import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import BarraNavegacion from "../componentes/BarraNavegacion";
import PiePagina from "../componentes/PiePagina";
import TarjetaMetrica from "../componentes/TarjetaMetrica";
import {
  obtenerUsuarioActual,
  obtenerOrdenes,
  obtenerProductosInventario,
  type Usuario,
} from "../datos/db";

function Vendedor() {
  const [usuario] = useState<Usuario | null>(() => obtenerUsuarioActual());
  const [totalCompras] = useState(() => {
    const ordenes = obtenerOrdenes();
    return ordenes.reduce((acc, o) => acc + o.total, 0);
  });
  const [totalProductos] = useState(() => obtenerProductosInventario().length);
  const navigate = useNavigate();

  useEffect(() => {
    const actual = obtenerUsuarioActual();
    if (!actual || actual.rol !== "vendedor") {
      navigate("/login");
    }
  }, [navigate]);

  if (!usuario) return null;

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <BarraNavegacion />

      <main className="container mb-5">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center my-4 gap-2">
          <div>
            <h2 className="custom-title mb-1">
              <i className="bi bi-briefcase-fill text-info me-2"></i> Panel del Vendedor
            </h2>
            <p className="text-muted mb-0">
              Gestión de inventario de repuestos y seguimiento de pedidos de clientes.
            </p>
          </div>
          <span className="badge bg-info text-dark fs-6 px-3 py-2 align-self-start align-self-md-auto">
            Vendedor: {usuario.nombre}
          </span>
        </div>

        {/* MÉTRICAS VENDEDOR */}
        <div className="row g-4 mb-5">
          <div className="col-md-6">
            <TarjetaMetrica
              titulo="Ventas Registradas"
              valor={`$${totalCompras.toLocaleString("es-CL")}`}
              subtitulo="Total de compras despachadas"
              icono="bi-cart-check-fill"
              colorFondo="bg-primary"
            />
          </div>
          <div className="col-md-6">
            <TarjetaMetrica
              titulo="Repuestos en Inventario"
              valor={totalProductos}
              subtitulo="Stock disponible en tienda"
              icono="bi-box-seam-fill"
              colorFondo="bg-success"
            />
          </div>
        </div>

        {/* ACCESOS PERMITIDOS AL VENDEDOR (SIN GESTIÓN DE USUARIOS) */}
        <h4 className="fw-bold mb-3">Tus Tareas:</h4>
        <div className="row row-cols-1 row-cols-md-2 g-4">
          <div className="col">
            <div className="card h-100 border-0 shadow-sm p-4">
              <div className="d-flex align-items-center mb-3">
                <i className="bi bi-boxes fs-1 text-primary me-3"></i>
                <div>
                  <h5 className="fw-bold mb-0">Inventario y Stock</h5>
                  <small className="text-muted">Revisar stock de repuestos y niveles críticos</small>
                </div>
              </div>
              <p className="text-muted small">
                Comprueba las cantidades de cada repuesto para advertir de stock bajo.
              </p>
              <Link to="/admin/productos" className="btn btn-outline-primary mt-auto">
                Abrir Inventario <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
          </div>

          <div className="col">
            <div className="card h-100 border-0 shadow-sm p-4">
              <div className="d-flex align-items-center mb-3">
                <i className="bi bi-receipt fs-1 text-success me-3"></i>
                <div>
                  <h5 className="fw-bold mb-0">Órdenes de Clientes</h5>
                  <small className="text-muted">Revisión de compras para despacho</small>
                </div>
              </div>
              <p className="text-muted small">
                Accede al historial de compras para coordinar entregas y preparar los paquetes.
              </p>
              <Link to="/admin/ordenes" className="btn btn-outline-success mt-auto">
                Ver Órdenes <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <PiePagina />
    </div>
  );
}

export default Vendedor;
