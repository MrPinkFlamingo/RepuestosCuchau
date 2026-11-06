import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

// Arreglo de rutas del menú para renderizado dinámico mediante .map()
const ENLACES_MENU = [
  { ruta: "/", texto: "Inicio" },
  { ruta: "/productos", texto: "Productos" },
  { ruta: "/categorias", texto: "Categorías" },
  { ruta: "/ofertas", texto: "Ofertas" },
  { ruta: "/nosotros", texto: "Nosotros" },
  { ruta: "/blog", texto: "Blog" },
  { ruta: "/contactos", texto: "Contactos" },
];
import {
  obtenerUsuarioActual,
  cerrarSesion,
  calcularTotalCarrito,
  type Usuario,
} from "../datos/db";

function BarraNavegacion() {
  const [usuario, setUsuario] = useState<Usuario | null>(() => obtenerUsuarioActual());
  const [totales, setTotales] = useState(() => calcularTotalCarrito());
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Sincronizar estado de usuario y carrito cuando ocurran cambios
    const sincronizar = () => {
      setUsuario(obtenerUsuarioActual());
      setTotales(calcularTotalCarrito());
    };

    window.addEventListener("cuchau-storage-change", sincronizar);
    window.addEventListener("storage", sincronizar);

    return () => {
      window.removeEventListener("cuchau-storage-change", sincronizar);
      window.removeEventListener("storage", sincronizar);
    };
  }, []);

  const handleCerrarSesion = () => {
    cerrarSesion();
    navigate("/login");
  };

  const totalPrecio = totales.total;
  const totalItems = totales.totalCantidad;

  return (
    <header>
      {/* 1. NAVBAR PRINCIPAL OSCURO (#212529) */}
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#212529" }}>
        <div className="container">
          <Link className="navbar-brand fw-bold text-warning" to="/">
            <i className="bi bi-tools me-2"></i> Repuestos Cuchau
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarPrincipal"
            aria-controls="navbarPrincipal"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarPrincipal">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center gap-2">
              {/* RENDERIZADO CONDICIONAL SEGÚN SESIÓN Y ROL (UN SOLO NAVBAR ADAPTADO) */}
              {usuario ? (
                <>
                  <li className="nav-item">
                    <span className="nav-link text-light">
                      <i className="bi bi-person-circle me-1"></i>
                      Hola, <strong>{usuario.nombre}</strong>
                      {usuario.rol === "admin" && (
                        <span className="badge bg-warning text-dark ms-2">Admin</span>
                      )}
                      {usuario.rol === "vendedor" && (
                        <span className="badge bg-info text-dark ms-2">Vendedor</span>
                      )}
                    </span>
                  </li>

                  {/* Acceso a panel administrativo si es admin */}
                  {usuario.rol === "admin" && (
                    <li className="nav-item">
                      <Link className="btn btn-outline-warning btn-sm" to="/admin">
                        Panel Admin
                      </Link>
                    </li>
                  )}

                  {/* Acceso a panel de vendedor si es vendedor */}
                  {usuario.rol === "vendedor" && (
                    <li className="nav-item">
                      <Link className="btn btn-outline-info btn-sm" to="/vendedor">
                        Panel Vendedor
                      </Link>
                    </li>
                  )}

                  <li className="nav-item">
                    <button
                      onClick={handleCerrarSesion}
                      className="btn btn-outline-light btn-sm"
                      title="Cerrar sesión"
                    >
                      <i className="bi bi-box-arrow-right me-1"></i> Salir
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/login">
                      Iniciar Sesión
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="btn btn-outline-light btn-sm" to="/registro">
                      Regístrate
                    </Link>
                  </li>
                </>
              )}

              {/* CARRITO REACTIVO CON CONTADOR DINÁMICO */}
              {usuario && (
                <li className="nav-item ms-lg-2">
                <Link
                  className="btn btn-warning btn-sm position-relative fw-semibold d-flex align-items-center gap-2"
                  to="/carrito"
                  title="Ver Carrito de Compras"
                >
                  <i className="bi bi-cart3 fs-6"></i>
                  <span>
                    {totalPrecio > 0
                      ? `$${totalPrecio.toLocaleString("es-CL")}`
                      : "Carrito"}
                  </span>
                  {totalItems > 0 && (
                    <span className="badge bg-danger rounded-pill">
                      {totalItems}
                    </span>
                  )}
                </Link>
              </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* 2. NAVBAR SECUNDARIO DE CATEGORÍAS Y NAVEGACIÓN */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm mb-4">
        <div className="container">
          <ul
            className="navbar-nav flex-row w-100 justify-content-center flex-wrap"
            style={{ gap: "15px" }}
          >
            {ENLACES_MENU.map((enlace) => {
              const estaActivo = location.pathname === enlace.ruta;
              return (
                <li key={enlace.ruta} className="nav-item">
                  <Link
                    className={`nav-link fw-bold ${estaActivo ? "text-primary activo" : ""}`}
                    to={enlace.ruta}
                  >
                    {enlace.texto}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default BarraNavegacion;
