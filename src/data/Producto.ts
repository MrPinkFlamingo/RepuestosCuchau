export interface Producto {
  id: string;
  nombre: string;
  descripcion: string;
  precio: string;
  urlImagen: string;
  altImagen: string;
}

export const PRODUCTOS: Producto[] = [
  {
    id: "1",
    nombre: "Filtro de Aceite Bosch Premium",
    descripcion: "Para motores bencineros 1.6 y 2.0",
    precio: "8.990",
    urlImagen: "img/FiltroAceiteBoschPremium.jpg",
    altImagen: "Filtro de Aceite Bosch Premium",
  },
  {
    id: "2",
    nombre: "Juego Pastillas de Freno Brembo",
    descripcion: "Alta durabilidad, cero ruidos.",
    precio: "35.000",
    urlImagen: "img/JuegoDePastillasBrembo.jpg",
    altImagen: "Juego Pastillas de Freno Brembo",
  },
  {
    id: "3",
    nombre: "Batería Hankook 55AMP",
    descripcion: "Libre de mantención, partida rápida.",
    precio: "55.990",
    urlImagen: "img/BateriaHankook55MP.jpg",
    altImagen: "Batería Hankook 55AMP",
  },
  {
    id: "4",
    nombre: "Aceite Mobil 1 Sintético 5W-30 (4L)",
    descripcion: "Máximo rendimiento y protección.",
    precio: "42.500",
    urlImagen: "img/AcaiteMobil5W-30.jpg",
    altImagen: "Aceite Mobil 1 Sintético 5W-30",
  },
];
