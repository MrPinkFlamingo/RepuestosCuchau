// Base de datos simulada en LocalStorage para Usuarios, Órdenes y Productos

export interface Usuario {
  id: string;
  nombre: string;
  rut: string;
  correo: string;
  password?: string;
  rol: "admin" | "vendedor" | "cliente";
  estado: "Activo" | "Inactivo";
}

export interface Orden {
  id: string;
  fecha: string;
  cliente: string;
  rutCliente: string;
  total: string;
  estado: "Completada" | "Cancelada" | "Pendiente";
}

export interface ProductoItem {
  id: string;
  codigo: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  precio: string;
  stock: number;
  urlImagen: string;
}

// Datos iniciales idénticos a los archivos originales de master
const USUARIOS_INICIALES: Usuario[] = [
  {
    id: "USR-001",
    nombre: "Carlos Ruiz",
    rut: "15342111-0",
    correo: "carlos@profesor.duoc.cl",
    password: "123",
    rol: "admin",
    estado: "Activo",
  },
  {
    id: "USR-002",
    nombre: "Juan Pérez",
    rut: "19011022-2",
    correo: "juan.perez@duoc.cl",
    password: "123",
    rol: "vendedor",
    estado: "Activo",
  },
  {
    id: "USR-003",
    nombre: "María López",
    rut: "18567234-4",
    correo: "maria.lopez@gmail.com",
    password: "123",
    rol: "cliente",
    estado: "Activo",
  },
  {
    id: "USR-004",
    nombre: "Taller Mecánico El Rápido",
    rut: "76543210-3",
    correo: "taller.elrapido@gmail.com",
    password: "123",
    rol: "cliente",
    estado: "Inactivo",
  },
];

const ORDENES_INICIALES: Orden[] = [
  {
    id: "ORD-10045",
    fecha: "21-09-2026",
    cliente: "Juan Pérez",
    rutCliente: "19011022-2",
    total: "$43.990",
    estado: "Completada",
  },
  {
    id: "ORD-10046",
    fecha: "20-09-2026",
    cliente: "María López",
    rutCliente: "18567234-4",
    total: "$111.980",
    estado: "Cancelada",
  },
  {
    id: "ORD-10047",
    fecha: "19-09-2026",
    cliente: "Carlos Ruiz",
    rutCliente: "15342111-0",
    total: "$8.990",
    estado: "Completada",
  },
  {
    id: "ORD-10048",
    fecha: "18-09-2026",
    cliente: "Taller Mecánico El Rápido",
    rutCliente: "76543210-3",
    total: "$350.000",
    estado: "Cancelada",
  },
];

const PRODUCTOS_GESTION_INICIALES: ProductoItem[] = [
  {
    id: "1",
    codigo: "P-001",
    nombre: "Filtro de Aceite Bosch Premium",
    descripcion: "Para motores bencineros 1.6 y 2.0",
    categoria: "Filtros",
    precio: "$8.990",
    stock: 45,
    urlImagen: "/img/FiltroAceiteBoschPremium.jpg",
  },
  {
    id: "2",
    codigo: "P-002",
    nombre: "Juego Pastillas de Freno Brembo",
    descripcion: "Alta durabilidad, cero ruidos.",
    categoria: "Frenos",
    precio: "$35.000",
    stock: 12,
    urlImagen: "/img/JuegoDePastillasBrembo.jpg",
  },
  {
    id: "3",
    codigo: "P-003",
    nombre: "Batería Hankook 55AMP",
    descripcion: "Libre de mantención, partida rápida.",
    categoria: "Baterías",
    precio: "$55.990",
    stock: 20,
    urlImagen: "/img/BateriaHankook55MP.jpg",
  },
  {
    id: "4",
    codigo: "P-004",
    nombre: "Aceite Mobil 1 Sintético 5W-30 (4L)",
    descripcion: "Máximo rendimiento y protección.",
    categoria: "Aceites",
    precio: "$42.500",
    stock: 2,
    urlImagen: "/img/AcaiteMobil5W-30.jpg",
  },
];

// Inicializar en localStorage si no existen
const initDB = () => {
  if (!localStorage.getItem("cuchau_usuarios")) {
    localStorage.setItem("cuchau_usuarios", JSON.stringify(USUARIOS_INICIALES));
  }
  if (!localStorage.getItem("cuchau_ordenes")) {
    localStorage.setItem("cuchau_ordenes", JSON.stringify(ORDENES_INICIALES));
  }
  if (!localStorage.getItem("cuchau_productos")) {
    localStorage.setItem("cuchau_productos", JSON.stringify(PRODUCTOS_GESTION_INICIALES));
  }
};

// Funciones para Usuarios
export const getUsuarios = (): Usuario[] => {
  initDB();
  const data = localStorage.getItem("cuchau_usuarios");
  return data ? JSON.parse(data) : USUARIOS_INICIALES;
};

export const guardarUsuario = (nuevo: Usuario) => {
  const usuarios = getUsuarios();
  usuarios.push(nuevo);
  localStorage.setItem("cuchau_usuarios", JSON.stringify(usuarios));
};

export const eliminarUsuario = (id: string) => {
  const usuarios = getUsuarios().filter((u) => u.id !== id);
  localStorage.setItem("cuchau_usuarios", JSON.stringify(usuarios));
};

// Funciones para Órdenes
export const getOrdenes = (): Orden[] => {
  initDB();
  const data = localStorage.getItem("cuchau_ordenes");
  return data ? JSON.parse(data) : ORDENES_INICIALES;
};

// Funciones para Productos
export const getProductosGestion = (): ProductoItem[] => {
  initDB();
  const data = localStorage.getItem("cuchau_productos");
  return data ? JSON.parse(data) : PRODUCTOS_GESTION_INICIALES;
};

// Manejo de Sesión Actual
export const getUsuarioSesion = (): Usuario | null => {
  const data = localStorage.getItem("cuchau_sesion");
  return data ? JSON.parse(data) : null;
};

export const setUsuarioSesion = (u: Usuario | null) => {
  if (u) {
    localStorage.setItem("cuchau_sesion", JSON.stringify(u));
  } else {
    localStorage.removeItem("cuchau_sesion");
  }
};
