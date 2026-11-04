export interface Pagina {
  nombre: string;
  ruta: string;
  nombreCorto: string;
}

export const PAGINAS: Pagina[] = [
  {
    nombre: "Inicio",
    ruta: "/",
    nombreCorto: "Inicio",
  },
  {
    nombre: "Productos",
    ruta: "/productos",
    nombreCorto: "Productos",
  },
  {
    nombre: "Nosotros",
    ruta: "/nosotros",
    nombreCorto: "Nosotros",
  },
  {
    nombre: "Blog",
    ruta: "/blog",
    nombreCorto: "Blog",
  },
  {
    nombre: "Contactos",
    ruta: "/contactos",
    nombreCorto: "Contactos",
  },
];
