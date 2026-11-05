import { PRODUCTOS, type Producto } from "./Productos";

export interface Usuario {
  id: string;
  rut: string;
  nombre: string;
  apellidos?: string;
  correo: string;
  contrasena: string;
  rol: "admin" | "vendedor" | "cliente";
  telefono?: string;
  direccion?: string;
  region?: string;
  comuna?: string;
}

export interface ItemCarrito {
  producto: Producto;
  cantidad: number;
}

export interface OrdenCompra {
  id: string;
  codigoOrden: string; // ej: #ORD-20240705
  fecha: string;
  cliente: {
    nombre: string;
    apellidos: string;
    correo: string;
    calle: string;
    depto?: string;
    region: string;
    comuna: string;
    indicaciones?: string;
  };
  items: ItemCarrito[];
  total: number;
  estado: "Completada" | "Pendiente" | "Cancelada";
}

// Claves de LocalStorage
const STORAGE_USUARIOS = "cuchau_usuarios_v2";
const STORAGE_USUARIO_ACTUAL = "cuchau_usuario_actual_v2";
const STORAGE_CARRITO = "cuchau_carrito_v2";
const STORAGE_ORDENES = "cuchau_ordenes_v2";
const STORAGE_PRODUCTOS = "cuchau_productos_v2";

// Usuarios de prueba iniciales
const USUARIOS_BASE: Usuario[] = [
  {
    id: "usr-1",
    rut: "19234567-8",
    nombre: "Carlos",
    apellidos: "Cifuentes",
    correo: "carlos@profesor.duoc.cl",
    contrasena: "123456",
    rol: "admin",
    direccion: "Av. Paicaví 3280",
    region: "Biobío",
    comuna: "Concepción",
  },
  {
    id: "usr-2",
    rut: "15987654-3",
    nombre: "Juan",
    apellidos: "Pérez",
    correo: "juan.perez@duoc.cl",
    contrasena: "123456",
    rol: "vendedor",
    direccion: "Calle Barros Arana 1050",
    region: "Biobío",
    comuna: "Concepción",
  },
  {
    id: "usr-3",
    rut: "18765432-1",
    nombre: "María",
    apellidos: "López",
    correo: "maria.lopez@gmail.com",
    contrasena: "123456",
    rol: "cliente",
    direccion: "Los Crisantemos 450",
    region: "Biobío",
    comuna: "San Pedro de la Paz",
  },
];

// Disparador de eventos para que cualquier componente en React se entere al instante
const notificarCambio = () => {
  window.dispatchEvent(new Event("cuchau-storage-change"));
};

// ==========================================
// 1. MÓDULO DE USUARIOS (CRUD Y SESIÓN)
// ==========================================

export function obtenerUsuarios(): Usuario[] {
  const guardados = localStorage.getItem(STORAGE_USUARIOS);
  if (!guardados) {
    localStorage.setItem(STORAGE_USUARIOS, JSON.stringify(USUARIOS_BASE));
    return USUARIOS_BASE;
  }
  try {
    return JSON.parse(guardados);
  } catch {
    return USUARIOS_BASE;
  }
}

export function registrarUsuario(usuario: Omit<Usuario, "id">): { ok: boolean; mensaje: string; usuario?: Usuario } {
  const usuarios = obtenerUsuarios();
  const existe = usuarios.some((u) => u.correo.toLowerCase() === usuario.correo.toLowerCase());
  if (existe) {
    return { ok: false, mensaje: "El correo ya se encuentra registrado." };
  }

  const nuevo: Usuario = {
    ...usuario,
    id: "usr-" + Date.now(),
  };

  usuarios.push(nuevo);
  localStorage.setItem(STORAGE_USUARIOS, JSON.stringify(usuarios));
  notificarCambio();
  return { ok: true, mensaje: "Usuario registrado con éxito.", usuario: nuevo };
}

export function eliminarUsuario(id: string): boolean {
  const usuarios = obtenerUsuarios();
  const filtrados = usuarios.filter((u) => u.id !== id);
  if (filtrados.length === usuarios.length) return false;
  localStorage.setItem(STORAGE_USUARIOS, JSON.stringify(filtrados));
  notificarCambio();
  return true;
}

export function iniciarSesion(correo: string, contrasena: string): { ok: boolean; mensaje: string; usuario?: Usuario } {
  const usuarios = obtenerUsuarios();
  const usuario = usuarios.find(
    (u) => u.correo.toLowerCase() === correo.trim().toLowerCase() && u.contrasena === contrasena
  );

  if (!usuario) {
    return { ok: false, mensaje: "Correo o contraseña incorrectos." };
  }

  localStorage.setItem(STORAGE_USUARIO_ACTUAL, JSON.stringify(usuario));
  notificarCambio();
  return { ok: true, mensaje: "Inicio de sesión correcto.", usuario };
}

export function cerrarSesion(): void {
  localStorage.removeItem(STORAGE_USUARIO_ACTUAL);
  notificarCambio();
}

export function obtenerUsuarioActual(): Usuario | null {
  const actual = localStorage.getItem(STORAGE_USUARIO_ACTUAL);
  if (!actual) return null;
  try {
    return JSON.parse(actual);
  } catch {
    return null;
  }
}

// ==========================================
// 2. MÓDULO DEL CARRITO (REACTIVO)
// ==========================================

export function obtenerCarrito(): ItemCarrito[] {
  const guardado = localStorage.getItem(STORAGE_CARRITO);
  if (!guardado) return [];
  try {
    return JSON.parse(guardado);
  } catch {
    return [];
  }
}

export function agregarAlCarrito(producto: Producto, cantidad: number = 1): void {
  const carrito = obtenerCarrito();
  const index = carrito.findIndex((item) => String(item.producto.id) === String(producto.id));

  if (index >= 0) {
    carrito[index].cantidad += cantidad;
  } else {
    carrito.push({ producto, cantidad });
  }

  localStorage.setItem(STORAGE_CARRITO, JSON.stringify(carrito));
  notificarCambio();
}

export function actualizarCantidadCarrito(productoId: string | number, cantidad: number): void {
  const carrito = obtenerCarrito();
  const index = carrito.findIndex((item) => String(item.producto.id) === String(productoId));

  if (index >= 0) {
    if (cantidad <= 0) {
      carrito.splice(index, 1);
    } else {
      carrito[index].cantidad = cantidad;
    }
    localStorage.setItem(STORAGE_CARRITO, JSON.stringify(carrito));
    notificarCambio();
  }
}

export function eliminarDelCarrito(productoId: string | number): void {
  const carrito = obtenerCarrito();
  const filtrado = carrito.filter((item) => String(item.producto.id) !== String(productoId));
  localStorage.setItem(STORAGE_CARRITO, JSON.stringify(filtrado));
  notificarCambio();
}

export function vaciarCarrito(): void {
  localStorage.removeItem(STORAGE_CARRITO);
  notificarCambio();
}

export function calcularTotalCarrito(): { totalCantidad: number; subtotal: number; total: number } {
  const carrito = obtenerCarrito();
  const totalCantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const total = carrito.reduce((acc, item) => acc + item.producto.precio * item.cantidad, 0);
  return {
    totalCantidad,
    subtotal: total,
    total,
  };
}

// ==========================================
// 3. MÓDULO DE PRODUCTOS (CRUD INVENTARIO)
// ==========================================

export function obtenerProductosInventario(): Producto[] {
  const guardados = localStorage.getItem(STORAGE_PRODUCTOS);
  if (!guardados) {
    localStorage.setItem(STORAGE_PRODUCTOS, JSON.stringify(PRODUCTOS));
    return PRODUCTOS;
  }
  try {
    return JSON.parse(guardados);
  } catch {
    return PRODUCTOS;
  }
}

export function guardarProducto(producto: Producto): void {
  const prods = obtenerProductosInventario();
  const idx = prods.findIndex((p) => String(p.id) === String(producto.id));
  if (idx >= 0) {
    prods[idx] = producto;
  } else {
    prods.push(producto);
  }
  localStorage.setItem(STORAGE_PRODUCTOS, JSON.stringify(prods));
  notificarCambio();
}

export function eliminarProducto(id: string | number): void {
  const prods = obtenerProductosInventario();
  const filtrados = prods.filter((p) => String(p.id) !== String(id));
  localStorage.setItem(STORAGE_PRODUCTOS, JSON.stringify(filtrados));
  notificarCambio();
}

// ==========================================
// 4. MÓDULO DE ÓRDENES (COMPRAS Y BOLETAS)
// ==========================================

export function obtenerOrdenes(): OrdenCompra[] {
  const guardadas = localStorage.getItem(STORAGE_ORDENES);
  if (!guardadas) return [];
  try {
    return JSON.parse(guardadas);
  } catch {
    return [];
  }
}

export function crearOrden(
  cliente: OrdenCompra["cliente"],
  items: ItemCarrito[],
  total: number
): OrdenCompra {
  const ordenes = obtenerOrdenes();
  const codigo = "#ORD-" + (20240700 + ordenes.length + 1);

  const nuevaOrden: OrdenCompra = {
    id: "ord-" + Date.now(),
    codigoOrden: codigo,
    fecha: new Date().toLocaleDateString("es-CL"),
    cliente,
    items,
    total,
    estado: "Completada",
  };

  ordenes.unshift(nuevaOrden);
  localStorage.setItem(STORAGE_ORDENES, JSON.stringify(ordenes));

  // Vaciar carrito tras la compra exitosa
  vaciarCarrito();
  notificarCambio();
  return nuevaOrden;
}
