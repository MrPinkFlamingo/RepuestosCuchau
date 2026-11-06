import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../componentes/Navbar";
import Footer from "../componentes/Footer";
import Alerta from "../componentes/Alerta";
import {
  obtenerProductosInventario,
  eliminarProducto,
  obtenerUsuarioActual,
} from "../datos/db";
import type { Producto } from "../datos/Productos";

function GestionProductos() {
  const [productos, setProductos] = useState<Producto[]>(() => obtenerProductosInventario());
  const [alerta, setAlerta] = useState<{ tipo: "success" | "danger"; texto: string } | null>(null);

  const navigate = useNavigate();

  const recargar = () => {
    setProductos(obtenerProductosInventario());
  };

  useEffect(() => {
    const usuario = obtenerUsuarioActual();
    if (!usuario || (usuario.rol !== "admin" && usuario.rol !== "vendedor")) {
      navigate("/login");
    }
  }, [navigate]);

  const handleEliminar = (id: string | number, nombreProd: string) => {
    if (window.confirm(`¿Seguro que deseas eliminar "${nombreProd}" del inventario?`)) {
      eliminarProducto(id);
      recargar();
      setAlerta({ tipo: "success", texto: `Producto "${nombreProd}" eliminado.` });
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <Navbar />

      <main className="container mb-5">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center my-4 gap-2">
          <div>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-1">
                <li className="breadcrumb-item">
                  <Link to="/admin">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">Inventario de Productos</li>
              </ol>
            </nav>
            <h2 className="custom-title mb-0">Gestión de Inventario y Stock</h2>
          </div>

          <div className="d-flex gap-2">
            <button
              type="button"
              className="btn btn-warning fw-semibold"
            >
              <i className="bi bi-plus-circle me-1"></i>
              Nuevo Producto
            </button>
            <Link to="/admin" className="btn btn-outline-dark">
              <i className="bi bi-arrow-left"></i> Volver
            </Link>
          </div>
        </div>

        {alerta && (
          <Alerta
            tipo={alerta.tipo}
            mensaje={alerta.texto}
            onCerrar={() => setAlerta(null)}
          />
        )}

        {/* TABLA DE PRODUCTOS */}
        <div className="card shadow-sm border-0">
          <div className="card-header bg-dark text-white fw-semibold d-flex justify-content-between align-items-center py-3">
            <span>Listado de Repuestos ({productos.length})</span>
            <small className="text-warning">
              <i className="bi bi-circle-fill text-warning me-1"></i> Stock Crítico (≤ 5)
            </small>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Foto</th>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Estado</th>
                    <th className="text-end">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map((prod) => (
                    <tr key={prod.id}>
                      <td style={{ width: "55px" }}>
                        <img
                          src={prod.imagen}
                          alt={prod.nombre}
                          style={{ width: "40px", height: "40px", objectFit: "contain" }}
                          className="border rounded p-1 bg-white"
                        />
                      </td>
                      <td className="small text-muted">{prod.id}</td>
                      <td>
                        <strong className="d-block">{prod.nombre}</strong>
                        <small className="text-muted text-truncate d-inline-block" style={{ maxWidth: "250px" }}>
                          {prod.descripcion}
                        </small>
                      </td>
                      <td>
                        <span className="badge bg-secondary-subtle text-secondary">
                          {prod.categoria}
                        </span>
                      </td>
                      <td className="fw-bold">${prod.precio.toLocaleString("es-CL")}</td>
                      <td>{prod.stock} un.</td>
                      <td>
                        {prod.stock <= 5 ? (
                          <span className="badge bg-warning text-dark">Crítico</span>
                        ) : (
                          <span className="badge bg-success">Disponible</span>
                        )}
                      </td>
                      <td className="text-end">
                        <Link
                          to={`/producto/${prod.id}`}
                          className="btn btn-outline-primary btn-sm me-1"
                          title="Ver en la tienda"
                        >
                          <i className="bi bi-eye"></i>
                        </Link>
                        <button
                          type="button"
                          className="btn btn-outline-dark btn-sm"
                          onClick={() => handleEliminar(prod.id, prod.nombre)}
                          title="Eliminar producto"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default GestionProductos;
