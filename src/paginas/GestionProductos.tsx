import { useState, useEffect, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import BarraNavegacion from "../componentes/BarraNavegacion";
import PiePagina from "../componentes/PiePagina";
import Alerta from "../componentes/Alerta";
import {
  obtenerProductosInventario,
  guardarProducto,
  eliminarProducto,
  obtenerUsuarioActual,
} from "../datos/db";
import type { Producto } from "../datos/Productos";

function GestionProductos() {
  const [productos, setProductos] = useState<Producto[]>(() => obtenerProductosInventario());
  const [mostrarForm, setMostrarForm] = useState(false);

  // Formulario nuevo producto
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("10");
  const [categoria, setCategoria] = useState<Producto["categoria"]>("Filtros");
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

  const handleCrearProducto = (e: FormEvent) => {
    e.preventDefault();
    if (!nombre.trim() || !precio || !stock) {
      setAlerta({ tipo: "danger", texto: "Completa los campos obligatorios." });
      return;
    }

    const nuevoProd: Producto = {
      id: "prod-" + Date.now(),
      nombre,
      descripcion,
      precio: parseInt(precio, 10),
      precioFormateado: `$${parseInt(precio, 10).toLocaleString("es-CL")}`,
      imagen: "/img/FiltroAceiteBoschPremium.jpg",
      categoria,
      stock: parseInt(stock, 10),
      enOferta: false,
    };

    guardarProducto(nuevoProd);
    recargar();
    setAlerta({ tipo: "success", texto: `¡Producto "${nombre}" agregado al inventario!` });

    setNombre("");
    setDescripcion("");
    setPrecio("");
    setStock("10");
    setMostrarForm(false);
  };

  const handleEliminar = (id: string | number, nombreProd: string) => {
    if (window.confirm(`¿Seguro que deseas eliminar "${nombreProd}" del inventario?`)) {
      eliminarProducto(id);
      recargar();
      setAlerta({ tipo: "success", texto: `Producto "${nombreProd}" eliminado.` });
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <BarraNavegacion />

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
              onClick={() => setMostrarForm(!mostrarForm)}
            >
              <i className="bi bi-plus-circle me-1"></i>
              {mostrarForm ? "Cancelar" : "Nuevo Producto"}
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

        {/* FORMULARIO DESPLEGABLE PARA AGREGAR PRODUCTO (RÚBRICA FIG. 10) */}
        {mostrarForm && (
          <div className="card shadow-sm border-0 p-4 mb-4 bg-white">
            <h5 className="fw-bold mb-3 border-bottom pb-2">Registrar Nuevo Repuesto</h5>
            <form onSubmit={handleCrearProducto} className="row g-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold small">Nombre del Producto*</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ej: Pastillas de Freno Delanteras"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-3">
                <label className="form-label fw-semibold small">Categoría*</label>
                <select
                  className="form-select"
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value as Producto["categoria"])}
                >
                  <option value="Filtros">Filtros</option>
                  <option value="Frenos">Frenos</option>
                  <option value="Baterías">Baterías</option>
                  <option value="Lubricantes">Lubricantes</option>
                  <option value="Motor">Motor</option>
                  <option value="Suspensión">Suspensión</option>
                </select>
              </div>
              <div className="col-md-3">
                <label className="form-label fw-semibold small">Precio en CLP*</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Ej: 24990"
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-3">
                <label className="form-label fw-semibold small">Stock Disponible*</label>
                <input
                  type="number"
                  className="form-control"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-9">
                <label className="form-label fw-semibold small">Descripción</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Breve descripción del repuesto y compatibilidad"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                />
              </div>
              <div className="col-12 text-end">
                <button type="submit" className="btn btn-success fw-bold px-4">
                  Guardar Repuesto
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TABLA DE PRODUCTOS */}
        <div className="card shadow-sm border-0">
          <div className="card-header bg-dark text-white fw-semibold d-flex justify-content-between align-items-center py-3">
            <span>Listado de Repuestos ({productos.length})</span>
            <small className="text-warning">
              <i className="bi bi-circle-fill text-danger me-1"></i> Rojo: Stock Crítico (≤ 5)
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
                          <span className="badge bg-danger">Crítico</span>
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
                          className="btn btn-outline-danger btn-sm"
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

      <PiePagina />
    </div>
  );
}

export default GestionProductos;
