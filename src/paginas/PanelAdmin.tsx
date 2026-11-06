import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../componentes/Navbar";
import Footer from "../componentes/Footer";
import MetricCard from "../componentes/MetricCard";
import {
  obtenerUsuarioActual,
  obtenerUsuarios,
  obtenerOrdenes,
  obtenerProductosInventario,
  type Usuario,
} from "../datos/db";

function PanelAdmin() {
  const [usuario] = useState<Usuario | null>(() => obtenerUsuarioActual());
  const [totalCompras] = useState(() => {
    const ordenes = obtenerOrdenes();
    return ordenes.reduce((acc, o) => acc + o.total, 0);
  });
  const [totalProductos] = useState(() => obtenerProductosInventario().length);
  const [totalUsuarios] = useState(() => obtenerUsuarios().length);
  const navigate = useNavigate();

  useEffect(() => {
    const actual = obtenerUsuarioActual();
    if (!actual || actual.rol !== "admin") {
      navigate("/login");
    }
  }, [navigate]);

  if (!usuario) return null;

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <Navbar />

      <main className="container mb-5">
        {/* ENCABEZADO DASHBOARD (FIGURA 9 DE LA RÚBRICA) */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center my-4 gap-2">
          <div>
            <h2 className="custom-title mb-1">
              Dashboard Administrativo
            </h2>
            <p className="text-muted mb-0">
              Resumen de actividades diarias, control de inventario y compras en tiempo real.
            </p>
          </div>
          <span className="badge bg-dark fs-6 px-3 py-2 align-self-start align-self-md-auto">
            <i className="bi bi-person-badge me-1"></i> Sesión: {usuario.nombre} ({usuario.rol})
          </span>
        </div>

        {/* 3 TARJETAS DE MÉTRICAS (FIGURA 9) */}
        <div className="row g-4 mb-5">
          <div className="col-md-4">
            <MetricCard
              titulo="Ventas Totales"
              valor={`$${totalCompras.toLocaleString("es-CL")}`}
              subtitulo="Facturación en tienda online"
              icono="bi-cart-check-fill"
              colorFondo="bg-primary"
            />
          </div>
          <div className="col-md-4">
            <MetricCard
              titulo="Productos en Catálogo"
              valor={totalProductos}
              subtitulo="Inventario total disponible"
              icono="bi-box-seam-fill"
              colorFondo="bg-dark"
              colorTexto="text-white"
            />
          </div>
          <div className="col-md-4">
            <MetricCard
              titulo="Usuarios Registrados"
              valor={totalUsuarios}
              subtitulo="Clientes, vendedores y admin"
              icono="bi-people-fill"
              colorFondo="bg-warning"
              colorTexto="text-dark"
            />
          </div>
        </div>

        {/* MÓDULOS DE GESTIÓN (FIGURA 9 Y 10 DE LA RÚBRICA) */}
        <h4 className="fw-bold mb-3">Módulos de Gestión:</h4>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {/* Módulo 1: Productos */}
          <div className="col">
            <div className="card h-100 border-0 shadow-sm p-3">
              <div className="card-body d-flex flex-column">
                <div className="d-flex align-items-center mb-3">
                  <i className="bi bi-boxes fs-1 text-primary me-3"></i>
                  <div>
                    <h5 className="fw-bold mb-0">Gestión de Productos</h5>
                    <small className="text-muted">Inventario, precios y stock crítico</small>
                  </div>
                </div>
                <p className="text-muted small flex-grow-1">
                  Administra los repuestos del catálogo, agrega nuevos productos y edita su stock.
                </p>
                <Link to="/admin/productos" className="btn btn-outline-primary w-100">
                  Ver Inventario de Productos <i className="bi bi-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>

          {/* Módulo 2: Órdenes */}
          <div className="col">
            <div className="card h-100 border-0 shadow-sm p-3">
              <div className="card-body d-flex flex-column">
                <div className="d-flex align-items-center mb-3">
                  <i className="bi bi-receipt fs-1 text-warning me-3"></i>
                  <div>
                    <h5 className="fw-bold mb-0">Órdenes y Boletas</h5>
                    <small className="text-muted">Compras y despacho de clientes</small>
                  </div>
                </div>
                <p className="text-muted small flex-grow-1">
                  Revisa las compras realizadas en la tienda, el detalle de productos y las direcciones de entrega.
                </p>
                <Link to="/admin/ordenes" className="btn btn-outline-warning w-100">
                  Ver Registro de Órdenes <i className="bi bi-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>

          {/* Módulo 3: Usuarios */}
          <div className="col">
            <div className="card h-100 border-0 shadow-sm p-3">
              <div className="card-body d-flex flex-column">
                <div className="d-flex align-items-center mb-3">
                  <i className="bi bi-person-gear fs-1 text-warning me-3"></i>
                  <div>
                    <h5 className="fw-bold mb-0">Gestión de Usuarios</h5>
                    <small className="text-muted">Cuentas, roles y permisos</small>
                  </div>
                </div>
                <p className="text-muted small flex-grow-1">
                  Consulta usuarios registrados en la base de datos, agrega nuevos usuarios o elimina accesos.
                </p>
                <Link to="/admin/usuarios" className="btn btn-outline-dark w-100">
                  Administrar Usuarios <i className="bi bi-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default PanelAdmin;
